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

function formatTime(time24) {
  if (!time24) return "";
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12 || 12;
  return `${hour}:${minute} ${ampm}`;
}

export default function Sleep() {
  const [target, setTarget] = useState("22:30");
  const [newTarget, setNewTarget] = useState("22:30");
  const [todaySleep, setTodaySleep] = useState("23:20");
  const [status, setStatus] = useState("Late");
  const [showPopup, setShowPopup] = useState(false);
  const [sleepInput, setSleepInput] = useState("");
  const [routineQuality, setRoutineQuality] = useState("Excellent");
  const [reflection, setReflection] = useState("");
  const [completedDays, setCompletedDays] = useState([1, 3, 4, 8, 11, 15, 19, 23]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const saveTarget = () => {
    if (!newTarget) return;
    setTarget(newTarget);
    setShowPopup(false);
  };

  const saveDay = () => {
    if (!sleepInput) {
      alert("Enter your sleep time");
      return;
    }

    setTodaySleep(sleepInput);
    const today = new Date().getDate();

    if (sleepInput <= target) {
      setStatus("On Time");
      if (!completedDays.includes(today)) {
        setCompletedDays([...completedDays, today]);
      }
    } else {
      setStatus("Late");
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
        label: "Sleep Before Target Trend",
        data: [23.4, 22.9, 23.1, 22.7],
        tension: 0.4
      }
    ]
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
          <p>8 days</p>
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

        <label>What time did you sleep?</label>
        <input type="time" value={sleepInput} onChange={(e) => setSleepInput(e.target.value)} />

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

        <button className="primary-btn" onClick={saveDay}>Save Day</button>
      </div>

      <div className="panel">
        <h2>Monthly Trend</h2>
        <Line data={chartData} />
      </div>

      {showPopup && (
        <div className="popup" style={{ display: "flex" }} onClick={() => setShowPopup(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3>Set Your X PM Target</h3>
            <input type="time" value={newTarget} onChange={(e) => setNewTarget(e.target.value)} />
            <br /><br />
            <button className="primary-btn" onClick={saveTarget}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}