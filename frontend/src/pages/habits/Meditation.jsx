import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import {
  getTodayDate,
  calculateStreak,
  getTodayEntry,
} from "../../utils/habitTracking";

export default function Meditation() {
  const { id } = useParams();
  const [target, setTarget] = useState(10);
  const [newTarget, setNewTarget] = useState("");
  const [todayTime, setTodayTime] = useState(0);
  const [status, setStatus] = useState("—");
  const [showPopup, setShowPopup] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [usage, setUsage] = useState("Breathwork");
  const [reflection, setReflection] = useState("");
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [streak, setStreak] = useState(0);
  const [monthCount, setMonthCount] = useState(0);

  const moods = ["😣 Anxious", "😴 Tired", "😐 Neutral", "😊 Calm", "🎯 Focused"];

  const fetchEntries = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/entries/${id}`);
      const data = await res.json();

      const todayEntry = getTodayEntry(data);
      if (todayEntry) {
        setTodayTime(Number(todayEntry.value) || 0);
        setTimeInput(String(todayEntry.value || ""));
        setStatus(todayEntry.status || "—");
        setReflection(todayEntry.notes || "");
      } else {
        setTodayTime(0);
        setTimeInput("");
        setStatus("—");
        setReflection("");
      }

      setStreak(calculateStreak(data));
      setMonthCount(data.length);
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

    useEffect(() => {
      const load = async () => {
        await fetchEntries();
      };

      load();
    }, [id]);

  const saveTarget = () => {
    const value = Number(newTarget);
    if (!value || value < 1) {
      alert("Enter a valid number");
      return;
    }
    setTarget(value);
    setShowPopup(false);
    setNewTarget("");
  };

  const saveDay = async () => {
  try {
    const res = await fetch("http://localhost:5001/api/entries", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        habit_id: Number(id),
        entry_date: getTodayDate(),
        value: timeInput,
        status: "Done",
        notes: reflection,
      }),
    });

    const data = await res.json();

    // ❌ ERROR case
    if (!res.ok) {
      alert(data.error || "Failed to save entry");
      return;
    }

    // ✅ SUCCESS case
    alert("Habit entry saved successfully");

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};
  return (
    <div className="page-wrapper meditation-page">
      <Navbar />

      <div className="panel">
        <h1>🧘 Meditation Dashboard</h1>
      </div>

      <div className="stats-grid meditation-stats-grid">
        <div className="stat-card yellow">
          <h3>Today's Session</h3>
          <p>{todayTime} min</p>
        </div>

        <div className="stat-card purple">
          <h3>Daily Target</h3>
          <p>{target} min</p>
        </div>

        <div className="stat-card pink">
          <h3>Status</h3>
          <p>{status}</p>
        </div>

        <div className="stat-card coral">
          <h3>Streak</h3>
          <p>{streak} days</p>
        </div>

        <div className="stat-card teal">
          <h3>Sessions / Month</h3>
          <p>{monthCount}</p>
        </div>
      </div>

      <div className="panel">
        <button className="primary-btn" onClick={() => setShowPopup(true)}>
          Change Target
        </button>
      </div>

      <div className="panel">
        <h2>Daily Entry</h2>

        <label>Session Duration (min)</label>
        <input
          type="number"
          min="1"
          placeholder="e.g. 10"
          value={timeInput}
          onChange={(e) => setTimeInput(e.target.value)}
        />

        <label>Session Type</label>
        <select value={usage} onChange={(e) => setUsage(e.target.value)}>
          <option>Breathwork</option>
          <option>Body Scan</option>
          <option>Mindfulness</option>
          <option>Visualization</option>
          <option>Loving Kindness</option>
          <option>Sleep Meditation</option>
        </select>

        <label>Mood Before</label>
        <div className="mood-row">
          {moods.map((mood) => (
            <button
              type="button"
              key={mood}
              className={`mood-btn ${moodBefore === mood ? "selected" : ""}`}
              onClick={() => setMoodBefore(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <label>Mood After</label>
        <div className="mood-row">
          {moods.map((mood) => (
            <button
              type="button"
              key={mood}
              className={`mood-btn ${moodAfter === mood ? "selected" : ""}`}
              onClick={() => setMoodAfter(mood)}
            >
              {mood}
            </button>
          ))}
        </div>

        <label>Reflection</label>
        <textarea
          placeholder="How did your session feel today?"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        ></textarea>

        <button className="primary-btn" onClick={saveDay}>
          Save Session
        </button>
      </div>

      {showPopup && (
        <div
          className="popup"
          style={{ display: "flex" }}
          onClick={() => setShowPopup(false)}
        >
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Set Daily Target (min)</h3>
            <input
              type="number"
              min="1"
              placeholder="e.g. 10"
              value={newTarget}
              onChange={(e) => setNewTarget(e.target.value)}
            />
            <br />
            <button className="primary-btn" onClick={saveTarget}>
              Save
            </button>
            <button
              className="primary-btn secondary-btn"
              onClick={() => setShowPopup(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}