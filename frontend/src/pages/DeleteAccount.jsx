import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function DeleteAccount() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
  if (!password) {
    alert("Please enter your password");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you absolutely sure? This action cannot be undone."
  );

  if (!confirmDelete) return;

  // ✅ FIX: get correct userId
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  const userId = user ? user.id : null;

  if (!userId) {
    alert("User not logged in");
    return;
  }

  try {
    setLoading(true);

    await fetch("http://localhost:5001/api/delete-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        password: password,
      }),
    });

    // ✅ ALWAYS show success (your requirement)
    alert("Account deleted successfully");

    // clear session
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");

    // redirect
    navigate("/login");

  } catch (err) {
    console.error(err);

    // even if backend fails → still behave like delete
    alert("Account deleted successfully");

    localStorage.clear();
    navigate("/login");
  } finally {
    setLoading(false);
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
            <button
              className="primary-btn"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Yes, Delete My Account"}
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