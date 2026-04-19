import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTodayDate, calculateStreak, getTodayEntry } from "../../utils/habitTracking";

export default function Screentime() {
  const { id } = useParams();

  const [target, setTarget] = useState(3);
  const [newTarget, setNewTarget] = useState(3);
  const [todayTime, setTodayTime] = useState(0);
  const [status, setStatus] = useState("Exceeded");
  const [showPopup, setShowPopup] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [usage, setUsage] = useState("Study");
  const [reflection, setReflection] = useState("");
  const [streak, setStreak] = useState(0);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/entries/${id}`);
      const data = await res.json();

      const todayEntry = getTodayEntry(data);
      if (todayEntry) {
        setTodayTime(Number(todayEntry.value) || 0);
        setTimeInput(todayEntry.value || "");
        setStatus(todayEntry.status || "Exceeded");
        setReflection(todayEntry.notes || "");
      } else {
        setTodayTime(0);
        setTimeInput("");
        setStatus("Exceeded");
        setReflection("");
      }

      setStreak(calculateStreak(data));
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  useEffect(() => {
  }, [id]);

  const saveTarget = () => {
    setTarget(Number(newTarget));
    setShowPopup(false);
  };

  const saveDay = async () => {
    if (timeInput === "") {
      alert("Enter screen time");
      return;
    }

    const time = Number(timeInput);
    const newStatus = time <= target ? "Good" : "Exceeded";
    const notes = `Usage: ${usage} | ${reflection}`;

    try {
      const res = await fetch("http://localhost:5001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          habit_id: id,
          entry_date: getTodayDate(),
          value: time,
          status: newStatus,
          notes
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save entry");
        return;
      }

      await fetchEntries();
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Server error");
    }
  };

  return (
    <div className="page-wrapper habit-page screentime-page">
      <Navbar />

      <div className="panel">
        <h1>Screentime</h1>
      </div>

      <div className="stats-grid custom-stats-grid">
        <div className="stat-card yellow">
          <h3>Today Screen Time</h3>
          <p>{todayTime} hrs</p>
        </div>

        <div className="stat-card purple">
          <h3>Target</h3>
          <p>{target} hrs</p>
        </div>

        <div className="stat-card pink">
          <h3>Status</h3>
          <p>{status}</p>
        </div>

        <div className="stat-card coral">
          <h3>Streak</h3>
          <p>{streak} days</p>
        </div>
      </div>

      <div className="panel">
        <button className="primary-btn" onClick={() => setShowPopup(true)}>
          Change Target
        </button>
      </div>

      <div className="panel">
        <h2>Daily Entry</h2>

        <label>Screen Time (hrs)</label>
        <input
          type="number"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />

        <label>Main Usage</label>
        <select value={usage} onChange={(e) => setUsage(e.target.value)}>
          <option>Study</option>
          <option>Social Media</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <label>Reflection</label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        ></textarea>

        <button className="primary-btn" onClick={saveDay}>
          Save Day
        </button>
      </div>

      {showPopup && (
        <div className="popup" style={{ display: "flex" }} onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Set Target</h3>
            <input
              type="number"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
            />
            <br /><br />
            <button className="primary-btn" onClick={saveTarget}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}