import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function OrganizeWorkspace() {
  const [status, setStatus] = useState("Pending");
  const [streak, setStreak] = useState(5);
  const [done, setDone] = useState("Yes");
  const [reflection, setReflection] = useState("");

  const saveDay = () => {
    const today = new Date().getDate();

    if (done === "Yes") {
      setStatus("Done");
      setStreak((prev) => prev + 1);
    } else {
      setStatus("Pending");
      setStreak(0);
    }

    console.log("Saved:", { done, reflection, today });
  };

  return (
    <div className="page-wrapper" style={{ backgroundColor: "var(--yellow)" }}>
      <Navbar />

      <div className="panel">
        <h1>Organize Workspace</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card yellow">
          <h3>Status</h3>
          <p>{status}</p>
        </div>

        <div className="stat-card purple">
          <h3>Streak</h3>
          <p>{streak} days</p>
        </div>
      </div>

      <div className="panel">
        <h2>Daily Entry</h2>

        <label>Did you organize today?</label>
        <select value={done} onChange={(e) => setDone(e.target.value)}>
          <option>Yes</option>
          <option>No</option>
        </select>

        <label>What did you organize?</label>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
        ></textarea>

        <button className="primary-btn" onClick={saveDay}>
          Save Day
        </button>
      </div>
    </div>
  );
}