import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function MyHabits() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  // counts for summary
  const totalHabits = habits.length;
  const dailyHabits = habits.filter(h => h.frequency === "Daily").length;
  const weeklyHabits = habits.filter(h => h.frequency === "Weekly").length;
  const monthlyHabits = habits.filter(h => h.frequency === "Monthly").length;

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">YOUR ROUTINE, ORGANIZED</p>
            <h1>My Habits</h1>
            <p className="hero-text">
              View, manage, and stay on top of the habits that build your daily consistency.
            </p>
          </div>
          <Link to="/new-habit" className="primary-btn">
            Add Habit
          </Link>
        </section>

        <section className="main-grid">
          <div className="panel large-panel">
            <h2>Daily Habits</h2>
            <ul className="activity-list">

              {habits.length === 0 ? (
                <li>No habits added yet.</li>
              ) : (
                habits.map((habit) => (
                <li key={habit.id}>
                  <Link to={`/habits/${habit.id}`} className="habit-item habit-link-item">
                    <span>{habit.title}</span>
                    <span className="tag green">
                      {habit.frequency || "Daily"}
                    </span>
                  </Link>
                </li>
                ))
              )}

            </ul>
          </div>

          <div className="panel side-panel">
            <h2>Habit Summary</h2>

            <div className="progress-block">
              <div className="progress-label">
                <span>Total Habits</span>
                <span>{totalHabits}</span>
              </div>
              <div className="progress-bar">
                <div className="fill purple-fill" style={{ width: "100%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Daily Habits</span>
                <span>{dailyHabits}</span>
              </div>
              <div className="progress-bar">
                <div className="fill green-fill" style={{ width: `${(dailyHabits/totalHabits)*100 || 0}%` }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Weekly Habits</span>
                <span>{weeklyHabits}</span>
              </div>
              <div className="progress-bar">
                <div className="fill blue-fill" style={{ width: `${(weeklyHabits/totalHabits)*100 || 0}%` }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Monthly Habits</span>
                <span>{monthlyHabits}</span>
              </div>
              <div className="progress-bar">
                <div className="fill coral-fill" style={{ width: `${(monthlyHabits/totalHabits)*100 || 0}%` }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h2>Weekly Habits</h2>
            <ul className="activity-list">
              {habits
                .filter(h => h.frequency === "Weekly")
                .map(h => (
                  <li key={h.id}>{h.title}</li>
                ))}
            </ul>
          </div>

          <div className="panel">
            <h2>Monthly Habits</h2>
            <ul className="activity-list">
              {habits
                .filter(h => h.frequency === "Monthly")
                .map(h => (
                  <li key={h.id}>{h.title}</li>
                ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}