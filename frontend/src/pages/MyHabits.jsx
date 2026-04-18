import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MyHabits() {
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
              <li>
                <Link to="/habits/screentime" className="habit-item habit-link-item">
                  <span>Screentime</span>
                  <span className="tag green">Daily</span>
                </Link>
              </li>
              <li className="habit-item">
                <span>Morning Exercise</span>
                <span className="tag blue">Daily</span>
              </li>
              <li className="habit-item">
                <span>Read 20 Pages</span>
                <span className="tag pink-tag">Daily</span>
              </li>
              <li>
                <Link to="/habits/meditation" className="habit-item habit-link-item">
                  <span>Meditation</span>
                  <span className="tag yellow-tag">Daily</span>
                </Link>
              </li>
              <li>
                <Link to="/habits/sleep" className="habit-item habit-link-item">
                  <span>Sleep Before 11 PM</span>
                  <span className="tag coral-tag">Daily</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="panel side-panel">
            <h2>Habit Summary</h2>

            <div className="progress-block">
              <div className="progress-label">
                <span>Total Habits</span>
                <span>8</span>
              </div>
              <div className="progress-bar">
                <div className="fill purple-fill" style={{ width: "100%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Daily Habits</span>
                <span>5</span>
              </div>
              <div className="progress-bar">
                <div className="fill green-fill" style={{ width: "62%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Weekly Habits</span>
                <span>2</span>
              </div>
              <div className="progress-bar">
                <div className="fill blue-fill" style={{ width: "25%" }}></div>
              </div>
            </div>

            <div className="progress-block">
              <div className="progress-label">
                <span>Monthly Habits</span>
                <span>1</span>
              </div>
              <div className="progress-bar">
                <div className="fill coral-fill" style={{ width: "13%" }}></div>
              </div>
            </div>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h2>Weekly Habits</h2>
            <ul className="activity-list">
              <li>Plan the week every Sunday</li>
              <li>Clean workspace</li>
            </ul>
          </div>

          <div className="panel">
            <h2>Monthly Habits</h2>
            <ul className="activity-list">
              <li>Review goals and progress</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}