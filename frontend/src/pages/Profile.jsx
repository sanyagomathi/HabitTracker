import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [showAvatar, setShowAvatar] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState({ hair: "", clothes: "", hats: "" });
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
    const navigate = useNavigate();
  const handleAvatarSelect = (type, value) => {
    setAvatar((prev) => ({ ...prev, [type]: value }));
  };

  const avatarText =
    `${avatar.hair ? avatar.hair[0] : ""}${avatar.clothes ? avatar.clothes[0] : ""}${avatar.hats ? avatar.hats[0] : ""}` ||
    "AD";

  const changePassword = () => {
    if (!newPass || !confirmPass) {
      alert("Please fill all fields");
      return;
    }

    if (newPass !== confirmPass) {
      alert("Password not matched");
      return;
    }

    alert("Password changed successfully");
    setShowPassword(false);
    setNewPass("");
    setConfirmPass("");
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="panel">
        <h2>User Profile</h2>

        <div className="profile-flex">
          <div className="avatar-circle">{avatarText}</div>

          <div>
            <p className="profile-label">Username</p>
            <p className="profile-value">Aishita</p>

            <p className="profile-label">Password</p>
            <p className="profile-value">********</p>

            <p className="profile-label">Email</p>
            <p className="profile-value">aishita@email.com</p>
          </div>
        </div>

        <div className="profile-completion">
          <p className="profile-label">Profile Completion</p>
          <div className="progress-bar">
            <div className="fill purple-fill" style={{ width: "80%" }}></div>
          </div>
          <p className="completion-text">80%</p>
        </div>

        <div className="profile-action">
          <button className="primary-btn" onClick={() => setShowAvatar(true)}>
            Create Your Avatar
          </button>
        </div>
      </div>

      <div className="panel">
        <h2>Account Settings</h2>
        <button className="primary-btn" onClick={() => setShowPassword(true)}>
          Change Password
        </button>
      </div>

      <div className="panel">
        <h2>Account Actions</h2>
        <div className="buttons">
          <button className="primary-btn">Logout</button>
            <button
            className="primary-btn delete-btn"
            onClick={() => navigate("/delete-account")}
            >
            Delete Account
            </button>
     </div>
      </div>

      {showAvatar && (
        <div className="avatar-popup" style={{ display: "flex" }} onClick={() => setShowAvatar(false)}>
          <div className="avatar-box" onClick={(e) => e.stopPropagation()}>
            <h2>Create Your Avatar</h2>

            <h3>Hair</h3>
            <div className="avatar-options">
              {["Short", "Long", "Curly", "Ponytail"].map((item) => (
                <button
                  key={item}
                  className={`option ${avatar.hair === item ? "selected-option" : ""}`}
                  onClick={() => handleAvatarSelect("hair", item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <h3>Clothes</h3>
            <div className="avatar-options">
              {["T-Shirt", "Hoodie", "Jacket"].map((item) => (
                <button
                  key={item}
                  className={`option ${avatar.clothes === item ? "selected-option" : ""}`}
                  onClick={() => handleAvatarSelect("clothes", item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <h3>Hats</h3>
            <div className="avatar-options">
              {["Cap", "Beanie", "Crown"].map((item) => (
                <button
                  key={item}
                  className={`option ${avatar.hats === item ? "selected-option" : ""}`}
                  onClick={() => handleAvatarSelect("hats", item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <button className="primary-btn" onClick={() => setShowAvatar(false)}>
              Done
            </button>
          </div>
        </div>
      )}

      {showPassword && (
        <div className="avatar-popup" style={{ display: "flex" }} onClick={() => setShowPassword(false)}>
          <div className="avatar-box" onClick={(e) => e.stopPropagation()}>
            <h2>Change Password</h2>

            <input
              type="password"
              className="input-field"
              placeholder="New Password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />

            <input
              type="password"
              className="input-field"
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
            />

            <button className="primary-btn" onClick={changePassword}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}