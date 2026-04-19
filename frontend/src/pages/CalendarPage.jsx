import { useState } from "react";
import Navbar from "../components/Navbar";

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const completedDays = [18, 19, 20];
  const partialDays = [ ];

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthYear =
    currentDate.toLocaleString("default", { month: "long" }) + " " + year;

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">YOUR HABIT HISTORY</p>
            <h1>Calendar View</h1>
            <p className="hero-text">
              View your month at a glance and quickly spot strong days, missed days, and partial completions.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card yellow">
            <h3>Completed Days</h3>
            <p>{completedDays.length}</p>
          </div>

          <div className="stat-card pink">
            <h3>Partial Days</h3>
            <p>{partialDays.length}</p>
          </div>

          <div className="stat-card coral">
            <h3>Missed Days</h3>
            <p>{lastDate - completedDays.length - partialDays.length}</p>
          </div>

          <div className="stat-card purple">
            <h3>Completion Rate</h3>
            <p>{Math.round((completedDays.length / lastDate) * 100)}%</p>
          </div>
        </section>

        <section className="panel">
          <h2>Monthly Calendar</h2>

          <div className="calendar-header">
            <button onClick={previousMonth}>⬅</button>
            <h3>{monthYear}</h3>
            <button onClick={nextMonth}>➡</button>
          </div>

          <div className="calendar-grid">
            {days.map((day) => (
              <div key={day} className="day-name">
                {day}
              </div>
            ))}

            {Array.from({ length: firstDay }).map((_, index) => (
              <div key={`empty-${index}`}></div>
            ))}

            {Array.from({ length: lastDate }, (_, index) => {
              const day = index + 1;

              let className = "day-box";
              if (completedDays.includes(day)) className += " done";
              if (partialDays.includes(day)) className += " partial-day";

              return (
                <div key={day} className={className}>
                  {day}
                </div>
              );
            })}
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h2>Legend</h2>
            <div className="calendar-legend">
              <div className="legend-item">
                <span className="legend-box done"></span>
                <span>Completed</span>
              </div>
              <div className="legend-item">
                <span className="legend-box partial-day"></span>
                <span>Partial</span>
              </div>
              <div className="legend-item">
                <span className="legend-box"></span>
                <span>Missed / No Entry</span>
              </div>
            </div>
          </div>

          <div className="panel">
            <h2>This Month</h2>
            <ul className="activity-list">
              <li>Best consistency: Sleep habit</li>
              <li>Most partial entries: Screentime</li>
              <li>Strongest week: Week 3</li>
              <li>Room to improve: Sunday routines</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}