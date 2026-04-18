import { useState } from "react";
import Navbar from "../../components/Navbar";

export default function TrackExpenses() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [todaySpend, setTodaySpend] = useState(0);
  const [status, setStatus] = useState("Within Budget");

  const budget = 500;

  const saveDay = () => {
    if (!amount) {
      alert("Enter amount");
      return;
    }

    const numericAmount = Number(amount);
    setTodaySpend(numericAmount);

    if (numericAmount <= budget) {
      setStatus("Within Budget");
    } else {
      setStatus("Exceeded");
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
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