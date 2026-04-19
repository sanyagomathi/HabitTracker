import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function HabitDetail() {
  const { id } = useParams();
  const [habit, setHabit] = useState(null);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/habits/${id}`)
      .then((res) => res.json())
      .then((data) => setHabit(data))
      .catch((err) => console.error("Error fetching habit:", err));

    fetch(`http://localhost:5001/api/entries/${id}`)
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error("Error fetching entries:", err));
  }, [id]);

  if (!habit) {
    return (
      <div className="page-wrapper">
        <Navbar />
        <main className="dashboard">
          <div className="panel">
            <p>Loading habit...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">HABIT DETAIL</p>
            <h1>{habit.title}</h1>
            <p className="hero-text">
              Track progress and stay consistent with this habit.
            </p>
          </div>
          <Link to="/myhabits" className="primary-btn">
            Back to My Habits
          </Link>
        </section>

        <section className="stats-grid">
          <div className="stat-card yellow">
            <h3>Category</h3>
            <p>{habit.category || "—"}</p>
          </div>

          <div className="stat-card pink">
            <h3>Frequency</h3>
            <p>{habit.frequency || "—"}</p>
          </div>

          <div className="stat-card coral">
            <h3>Target</h3>
            <p>{habit.target || "—"}</p>
          </div>

          <div className="stat-card purple">
            <h3>Total Entries</h3>
            <p>{entries.length}</p>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel large-panel">
            <h2>Habit Info</h2>

            <div className="habit-item">
              <span>Title</span>
              <span>{habit.title}</span>
            </div>

            <div className="habit-item">
              <span>Category</span>
              <span>{habit.category || "Not set"}</span>
            </div>

            <div className="habit-item">
              <span>Frequency</span>
              <span>{habit.frequency || "Not set"}</span>
            </div>

            <div className="habit-item">
              <span>Target</span>
              <span>{habit.target || "Not set"}</span>
            </div>
          </div>

          <div className="panel side-panel">
            <h2>Recent Entries</h2>

            {entries.length === 0 ? (
              <p>No entries yet.</p>
            ) : (
              entries.map((entry) => (
                <div className="habit-item" key={entry.id}>
                  <span>{entry.entry_date}</span>
                  <span className="tag green">
                    {entry.status || "Saved"}
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}