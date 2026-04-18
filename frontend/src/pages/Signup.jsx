import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // 🔥 Backend call (optional for now)
      await fetch("http://localhost:5001/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      alert("Account created!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error creating account");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      {/* HERO */}
      <section className="hero-card">
        <div>
          <p className="small-title">START YOUR JOURNEY</p>
          <h1>Create Account</h1>
          <p className="hero-text">
            Build consistency, track habits, and level up your daily routine.
          </p>
        </div>
      </section>

      {/* FORM PANEL */}
      <section className="panel">
        <h2>Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            required
            value={formData.password}
            onChange={handleChange}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="submit" className="primary-btn">
              Create Account
            </button>

            <button
              type="reset"
              className="primary-btn"
              style={{ background: "var(--blue)" }}
              onClick={() =>
                setFormData({
                  name: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>

        <p style={{ marginTop: "20px", fontWeight: 600 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ textDecoration: "underline" }}>
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}