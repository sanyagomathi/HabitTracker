import Navbar from "../components/Navbar";

export default function Progress() {
  const weeklyData = [
    { name: "Sleep", progress: 80, colorClass: "coral-fill" },
    { name: "Meditation", progress: 65, colorClass: "purple-fill" },
    { name: "Screentime", progress: 50, colorClass: "blue-fill" },
    { name: "Reading", progress: 72, colorClass: "green-fill" },
  ];

  const achievements = [
    "8-day sleep streak",
    "12 meditation sessions completed",
    "Reduced screentime by 2 hours this week",
    "Reading consistency improved by 15%",
  ];

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">TRACK YOUR GROWTH</p>
            <h1>Progress Overview</h1>
            <p className="hero-text">
              See how your habits are improving over time and where you are building the most consistency.
            </p>
          </div>
        </section>

        <section className="stats-grid">
          <div className="stat-card yellow">
            <h3>Total Habits Tracked</h3>
            <p>08</p>
          </div>

          <div className="stat-card pink">
            <h3>Completed This Week</h3>
            <p>24</p>
          </div>

          <div className="stat-card coral">
            <h3>Best Streak</h3>
            <p>12 Days</p>
          </div>

          <div className="stat-card purple">
            <h3>Avg Completion</h3>
            <p>67%</p>
          </div>
        </section>

        <section className="main-grid">
          <div className="panel large-panel">
            <h2>Habit Progress</h2>

            {weeklyData.map((habit) => (
              <div className="progress-block" key={habit.name}>
                <div className="progress-label">
                  <span>{habit.name}</span>
                  <span>{habit.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div
                    className={`fill ${habit.colorClass}`}
                    style={{ width: `${habit.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="panel side-panel">
            <h2>Insights</h2>
            <ul className="activity-list">
              <li>Sleep is your most consistent habit this week.</li>
              <li>Meditation improved compared to last week.</li>
              <li>Screentime still needs attention in the evenings.</li>
              <li>Reading is steady and improving gradually.</li>
            </ul>
          </div>
        </section>

        <section className="bottom-grid">
          <div className="panel">
            <h2>Achievements</h2>
            <ul className="activity-list">
              {achievements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel">
            <h2>Motivation</h2>
            <p className="quote">
              Progress is not about perfection. It is about showing up often enough that consistency becomes part of who you are.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}