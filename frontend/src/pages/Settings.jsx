import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const [user, setUser] = useState({
    name: "Aishita",
    email: "aishita@email.com",
  });
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSaveProfile = () => {
    alert("Profile updated (frontend only)");
  };

  const changePassword = () => {
    if (!newPass || !confirmPass) {
      alert("Fill all fields");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Passwords don’t match");
      return;
    }

    alert("Password updated");
    setShowPassword(false);
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <main className="dashboard">
        <section className="hero-card">
          <div>
            <p className="small-title">CONTROL YOUR APP</p>
            <h1>Settings</h1>
            <p className="hero-text">
              Manage your profile, preferences, and account settings.
            </p>
          </div>
        </section>

        {/* PROFILE */}
        <section className="panel">
          <h2>Profile Settings</h2>

          <label>Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) =>
              setUser({ ...user, name: e.target.value })
            }
          />

          <label>Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) =>
              setUser({ ...user, email: e.target.value })
            }
          />

          <div className="buttons">
            <button className="primary-btn" onClick={handleSaveProfile}>
              Save Changes
            </button>
          </div>
        </section>

        {/* PREFERENCES */}
        <section className="panel">
          <h2>Preferences</h2>

          <div className="setting-row">
            <span>Enable Notifications</span>
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
          </div>

          <div className="setting-row">
            <span>Dark Mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </section>

        {/* PASSWORD */}
        <section className="panel">
          <h2>Security</h2>

          <button
            className="primary-btn"
            onClick={() => setShowPassword(true)}
          >
            Change Password
          </button>
        </section>

        {/* ACCOUNT */}
        <section className="panel">
          <h2>Account Actions</h2>

          <div className="buttons">
            <button
            className="primary-btn delete-btn"
            onClick={() => navigate("/delete-account")}
            >
            Delete Account
            </button>
          </div>
        </section>

        {/* PASSWORD POPUP */}
        {showPassword && (
          <div
            className="popup"
            style={{ display: "flex" }}
            onClick={() => setShowPassword(false)}
          >
            <div
              className="popup-box"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Change Password</h3>

              <input
                type="password"
                placeholder="New Password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
              />

              <br />

              <button className="primary-btn" onClick={changePassword}>
                Save
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}