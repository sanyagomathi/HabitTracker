import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTodayDate, calculateStreak, getTodayEntry } from "../../utils/habitTracking";

export default function OrganizeWorkspace() {
  const { id } = useParams();
  const [status, setStatus] = useState("Pending");
  const [streak, setStreak] = useState(0);
  const [done, setDone] = useState("Yes");
  const [reflection, setReflection] = useState("");

  const fetchEntries = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/entries/${id}`);
      const data = await res.json();

      const todayEntry = getTodayEntry(data);
      if (todayEntry) {
        setStatus(todayEntry.status || "Pending");
        setDone(todayEntry.value || "Yes");
        setReflection(todayEntry.notes || "");
      } else {
        setStatus("Pending");
      }

      setStreak(calculateStreak(data));
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  useEffect(() => {
  }, [id]);

  const saveDay = async () => {
    const newStatus = done === "Yes" ? "Done" : "Pending";

    try {
      const res = await fetch("http://localhost:5001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          habit_id: id,
          entry_date: getTodayDate(),
          value: done,
          status: newStatus,
          notes: reflection
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save entry");
        return;
      }

      await fetchEntries();
    } catch (err) {
      console.error("Error saving entry:", err);
      alert("Server error");
    }
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
        />

        <button className="primary-btn" onClick={saveDay}>
          Save Day
        </button>
      </div>
    </div>
  );
}