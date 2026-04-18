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

export default function Screentime() {
  const [target, setTarget] = useState(3);
  const [newTarget, setNewTarget] = useState(3);
  const [todayTime, setTodayTime] = useState(10);
  const [status, setStatus] = useState("Exceeded");
  const [showPopup, setShowPopup] = useState(false);
  const [timeInput, setTimeInput] = useState("");
  const [usage, setUsage] = useState("Study");
  const [reflection, setReflection] = useState("");
  const [completedDays, setCompletedDays] = useState([2, 5, 7, 10, 14, 18, 22]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const saveTarget = () => {
    setTarget(Number(newTarget));
    setShowPopup(false);
  };

  const saveDay = () => {
    if (timeInput === "") {
      alert("Enter screen time");
      return;
    }

    const time = Number(timeInput);
    setTodayTime(time);

    const today = new Date().getDate();

    if (time <= target) {
      if (!completedDays.includes(today)) {
        setCompletedDays([...completedDays, today]);
      }
      setStatus("Good");
    } else {
      setStatus("Exceeded");
    }
  };

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const monthYear = currentDate.toLocaleString("default", { month: "long" }) + " " + year;
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Screen Time Trend",
        data: [5, 4, 6, 3],
        tension: 0.4
      }
    ]
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
          <p>12 days</p>
        </div>
      </div>

      <div className="panel">
        <button className="primary-btn" onClick={() => setShowPopup(true)}>
          Change Target
        </button>
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
            return (
              <div
                key={day}
                className={`day-box ${completedDays.includes(day) ? "done" : ""}`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>

      <div className="panel">
        <h2>Daily Entry</h2>

        <label>Screen Time (hrs)</label>
        <input type="number" value={timeInput} onChange={(e) => setTimeInput(e.target.value)} />

        <label>Main Usage</label>
        <select value={usage} onChange={(e) => setUsage(e.target.value)}>
          <option>Study</option>
          <option>Social Media</option>
          <option>Entertainment</option>
          <option>Other</option>
        </select>

        <label>Reflection</label>
        <textarea value={reflection} onChange={(e) => setReflection(e.target.value)}></textarea>

        <button className="primary-btn" onClick={saveDay}>Save Day</button>
      </div>

      <div className="panel">
        <h2>Monthly Trend</h2>
        <Line data={chartData} />
      </div>

      {showPopup && (
        <div className="popup" style={{ display: "flex" }} onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Set Target</h3>
            <input type="number" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} />
            <br /><br />
            <button className="primary-btn" onClick={saveTarget}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}