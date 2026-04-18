import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");

  const handleDelete = async () => {
    if (!password) {
      alert("Please enter your password");
      return;
    }

    try {
      // 🔥 OPTIONAL backend call
      await fetch("http://localhost:5001/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          password,
        }),
      });

      alert("Account deleted");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error deleting account");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="panel danger-panel">
          <h1>⚠ Delete Account</h1>

          <p className="warning-text">
            Are you sure you want to delete your account?
            <br />
            This action <strong>cannot be undone</strong>.
          </p>

          <label>Enter your password to confirm</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="buttons">
            <button className="primary-btn" onClick={handleDelete}>
              Yes, Delete My Account
            </button>

            <button
              className="primary-btn"
              onClick={() => navigate("/settings")}
            >
              Cancel
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}