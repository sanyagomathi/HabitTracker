import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { useParams } from "react-router-dom";
import { getTodayDate, calculateStreak, getTodayEntry } from "../../utils/habitTracking";

export default function TrackExpenses() {
  const { id } = useParams();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [todaySpend, setTodaySpend] = useState(0);
  const [status, setStatus] = useState("Within Budget");
  const [streak, setStreak] = useState(0);

  const budget = 500;

  const fetchEntries = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/entries/${id}`);
      const data = await res.json();

      const todayEntry = getTodayEntry(data);
      if (todayEntry) {
        setAmount(todayEntry.value || "");
        setTodaySpend(Number(todayEntry.value) || 0);
        setCategory(todayEntry.notes || "Food");
        setStatus(todayEntry.status || "Within Budget");
      } else {
        setAmount("");
        setTodaySpend(0);
        setCategory("Food");
        setStatus("Within Budget");
      }

      setStreak(calculateStreak(data));
    } catch (err) {
      console.error("Error fetching entries:", err);
    }
  };

  useEffect(() => {
  }, [id]);

  const saveDay = async () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    const numericAmount = Number(amount);
    const newStatus = numericAmount <= budget ? "Within Budget" : "Exceeded";

    try {
      const res = await fetch("http://localhost:5001/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          habit_id: id,
          entry_date: getTodayDate(),
          value: numericAmount,
          status: newStatus,
          notes: category,
        }),
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
    <div className="page-wrapper expenses-page">
      <Navbar />

      <div className="panel">
        <h1>Track Expenses</h1>
      </div>

      <div className="stats-grid custom-stats-grid">
        <div className="stat-card yellow">
          <h3>Today Spend</h3>
          <p>₹{todaySpend}</p>
        </div>

        <div className="stat-card purple">
          <h3>Budget</h3>
          <p>₹{budget}</p>
        </div>

        <div className="stat-card pink">
          <h3>Status</h3>
          <p>{status}</p>
        </div>

        <div className="stat-card coral">
          <h3>Streak</h3>
          <p>{streak} days</p>
        </div>
      </div>

      <div className="panel">
        <h2>Daily Entry</h2>

        <label>Amount Spent</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Other</option>
        </select>

        <button className="primary-btn" onClick={saveDay}>
          Save Day
        </button>
      </div>
    </div>
  );
}