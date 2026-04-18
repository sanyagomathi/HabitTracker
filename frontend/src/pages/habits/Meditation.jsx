import { useState } from "react";
import Navbar from "../../components/Navbar";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Meditation() {
  const [target, setTarget] = useState(10);
  const [newTarget, setNewTarget] = useState("");
  const [todayTime, setTodayTime] = useState(0);
  const [status, setStatus] = useState("—");
  const [monthCount, setMonthCount] = useState(8);
  const [showPopup, setShowPopup] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [usage, setUsage] = useState("Breathwork");
  const [reflection, setReflection] = useState("");
  const [completedDays, setCompletedDays] = useState([1, 3, 5, 7, 10, 12, 14, 18, 22]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [moodBefore, setMoodBefore] = useState("");
  const [moodAfter, setMoodAfter] = useState("");
  const [running, setRunning] = useState(false);
  const [breathCycles, setBreathCycles] = useState(0);

  const moods = ["😣 Anxious", "😴 Tired", "😐 Neutral", "😊 Calm", "🎯 Focused"];

  const saveTarget = () => {
    const value = Number(newTarget);
    if (!value || value < 1) {
      alert("Enter a valid number");
      return;
    }
    setTarget(value);
    setShowPopup(false);
  };

  const saveDay = () => {
    const time = Number(timeInput);
    if (!time || time < 1) {
      alert("Enter a valid session duration");
      return;
    }

    setTodayTime(time);
    setStatus(time >= target ? "Done! ✓" : "Partial");

    const today = new Date().getDate();
    if (time >= target && !completedDays.includes(today)) {
      setCompletedDays([...completedDays, today]);
    }

    setMonthCount((prev) => prev + 1);
  };

  const toggleBreath = () => {
    if (!running) {
      setRunning(true);
      setBreathCycles((prev) => prev + 1);
    } else {
      setRunning(false);
    }
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthYear = currentDate.toLocaleString("default", { month: "long" }) + " " + year;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Avg Session (min)",
        data: [7, 10, 9, 14],
        tension: 0.4,
        borderColor: "#4db6ac",
        backgroundColor: "rgba(77,182,172,0.15)",
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#4db6ac"
      },
      {
        label: "Target",
        data: [10, 10, 10, 10],
        tension: 0,
        borderColor: "#f48fb1",
        borderDash: [6, 4],
        pointRadius: 0,
        borderWidth: 2,
        fill: false
      }
    ]
  };

  return (
    <div className="page-wrapper meditation-page">
      <Navbar />

      <div className="panel">
        <h1>🧘 Meditation Dashboard</h1>
      </div>

      <div className="stats-grid meditation-stats-grid">
        <div className="stat-card yellow"><h3>Today's Session</h3><p>{todayTime} min</p></div>
        <div className="stat-card purple"><h3>Daily Target</h3><p>{target} min</p></div>
        <div className="stat-card pink"><h3>Status</h3><p>{status}</p></div>
        <div className="stat-card coral"><h3>Streak</h3><p>5 days</p></div>
        <div className="stat-card teal"><h3>Sessions / Month</h3><p>{monthCount}</p></div>
      </div>

      <div className="panel">
        <button className="primary-btn" onClick={() => setShowPopup(true)}>
          Change Target
        </button>
      </div>

      <div className="panel">
        <h2>Guided Breathing</h2>
        <div className="breathe-section">
          <div id="breathe-circle">{running ? "Breathing..." : "Press Start"}</div>
          <div id="breathe-label">4 – 2 – 6 Method</div>
          <div id="breathe-count">{breathCycles} breaths completed</div>
          <button id="breathe-btn" onClick={toggleBreath}>
            {running ? "Stop" : "Start"}
          </button>
        </div>
      </div>

      <div className="panel">
        <h2>Calendar</h2>

        <div className="calendar-header">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))}>⬅</button>
          <h3>{monthYear}</h3>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))}>➡</button>
        </div>

        <div className="calendar-grid">
          {days.map((day) => (
            <div key={day} className="day-name">{day}</div>
          ))}

          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`}></div>
          ))}

          {Array.from({ length: lastDate }, (_, i) => {
            const day = i + 1;
            const isDone = completedDays.includes(day) && month === todayMonth && year === todayYear;
            const isToday = day === todayDate && month === todayMonth && year === todayYear;

            return (
              <div
                key={day}
                className={`day-box ${isDone ? "done" : ""} ${isToday ? "today" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
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

        <button className="primary-btn" onClick={saveDay}>Save Session</button>
      </div>

      <div className="panel">
        <h2>Monthly Trend</h2>
        <Line data={chartData} />
      </div>

      {showPopup && (
        <div className="popup" style={{ display: "flex" }} onClick={() => setShowPopup(false)}>
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
            <button className="primary-btn" onClick={saveTarget}>Save</button>
            <button className="primary-btn secondary-btn" onClick={() => setShowPopup(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}