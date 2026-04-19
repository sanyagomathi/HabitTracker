import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTodayDate, calculateStreak, getTodayEntry } from "../../utils/habitTracking";

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function Sleep() {
  const { id } = useParams();
  const [target, setTarget] = useState("22:30");
  const [newTarget, setNewTarget] = useState("22:30");
  const [todaySleep, setTodaySleep] = useState("");
  const [status, setStatus] = useState("Late");
  const [showPopup, setShowPopup] = useState(false);
  const [sleepInput, setSleepInput] = useState("");
  const [routineQuality, setRoutineQuality] = useState("Excellent");
  const [reflection, setReflection] = useState("");
  const [streak, setStreak] = useState(0);

  const fetchEntries = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/entries/${id}`);
      const data = await res.json();

      const todayEntry = getTodayEntry(data);
      if (todayEntry) {
        setTodaySleep(todayEntry.value || "");
        setSleepInput(todayEntry.value || "");
        setStatus(todayEntry.status || "Late");
        setReflection(todayEntry.notes || "");
      } else {
        setTodaySleep("");
        setSleepInput("");
        setStatus("Late");
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
    if (!newTarget) return;
    setTarget(newTarget);
    setShowPopup(false);
  };

  const saveDay = async () => {
    if (!sleepInput) {
      alert("Enter your sleep time");
      return;
    }

    const newStatus = sleepInput <= target ? "On Time" : "Late";
    const notes = `Routine: ${routineQuality} | ${reflection}`;

    try {
      const res = await fetch("http://localhost:5001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          habit_id: id,
          entry_date: getTodayDate(),
          value: sleepInput,
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
    <div className="page-wrapper habit-page sleep-page">
      <Navbar />

      <div className="panel">
        <h1>Sleep Before {formatTime(target)}</h1>
      </div>

      <div className="stats-grid custom-stats-grid">
        <div className="stat-card yellow">
          <h3>Today's Sleep Time</h3>
          <p>{formatTime(todaySleep)}</p>
        </div>

        <div className="stat-card purple">
          <h3>Target Bedtime</h3>
          <p>{formatTime(target)}</p>
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

        <label>What time did you sleep?</label>
        <input
          type="time"
          value={sleepInput}
          onChange={(e) => setSleepInput(e.target.value)}
        />

        <label>Night Routine Quality</label>
        <select value={routineQuality} onChange={(e) => setRoutineQuality(e.target.value)}>
          <option>Excellent</option>
          <option>Good</option>
          <option>Okay</option>
          <option>Poor</option>
        </select>

        <label>Reflection</label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What helped or delayed your sleep?"
        ></textarea>

        <button className="primary-btn" onClick={saveDay}>
          Save Day
        </button>
      </div>

      {showPopup && (
        <div className="popup" style={{ display: "flex" }} onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Set Your X PM Target</h3>
            <input
              type="time"
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