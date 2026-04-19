import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/habits")
      .then((res) => res.json())
      .then((data) => setHabits(data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">COLORFUL PRODUCTIVITY</p>
            <h1>Habit Tracker Dashboard</h1>
            <p className="hero-text">
              Track your daily habits, maintain streaks, and stay consistent.
            </p>
          </div>
          <Link to="/new-habit" className="primary-btn">
            Add Habit
          </Link>
        </section>

        <section className="stats-grid">
          <div className="stat-card yellow">
            <h3>Today's Habits</h3>
            <p>{habits.length}</p>
          </div>

          <div className="stat-card pink">
            <h3>Completed</h3>
            <p>04</p>
          </div>

          <div className="stat-card coral">
            <h3>Current Streak</h3>
            <p>12 Days</p>
          </div>

          <div className="stat-card purple">
            <h3>Completion Rate</h3>
            <p>78%</p>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel large-panel">
            <h2>Today's Habits</h2>

            {habits.length === 0 ? (
              <p>No habits added yet.</p>
            ) : (
              habits.map((habit) => (
                <Link to={`/habits/${habit.id}`} className="habit-link" key={habit.id}>
                  <div className="habit-item">
                    <span>{habit.title}</span>
                    <span className="tag pink-tag">Pending</span>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="panel side-panel">
            <h2>Weekly Progress</h2>

            <div className="progress-block">
              <div className="progress-label">
                <span>Water Intake</span>
                <span>85%</span>
              </div>
              <div className="progress-bar">
                <div className="fill green-fill" style={{ width: "85%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Exercise</span>
                <span>70%</span>
              </div>
              <div className="progress-bar">
                <div className="fill purple-fill" style={{ width: "70%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Reading</span>
                <span>60%</span>
              </div>
              <div className="progress-bar">
                <div className="fill blue-fill" style={{ width: "60%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Meditation</span>
                <span>50%</span>
              </div>
              <div className="progress-bar">
                <div className="fill coral-fill" style={{ width: "50%" }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h2>Recent Activity</h2>
            <ul className="activity-list">
              <li>Completed Morning Exercise</li>
              <li>Logged Water Intake</li>
              <li>Reached 12-day streak</li>
              <li>Missed Meditation yesterday</li>
            </ul>
          </div>

          <div className="panel">
            <h2>Motivation</h2>
            <p className="quote">
              Success does not come from intensity once in a while. It comes from consistency with style.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}