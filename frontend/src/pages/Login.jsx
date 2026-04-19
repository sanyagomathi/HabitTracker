import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // 1. Logic to check Old Email and Password
      const response = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert("Login successful!");
        // Opens the dashboard page upon success
        navigate("/dashboard"); 
      } else {
        alert("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error connecting to the server.");
    }
  };

  return (
    <div className="page-wrapper">
      <section className="hero-card">
        <div>
          <p className="small-title">WELCOME BACK</p>
          <h1>Login</h1>
          <p className="hero-text">Verify your details to access your dashboard.</p>
        </div>
      </section>

      <section className="panel">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label>Password</label>
          <input 
            type="password" 
            placeholder="Enter your password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />

          <div className="buttons">
            <button type="submit" className="primary-btn">Log In →</button>
          </div>
        </form>

        {/* 2. Option to open the sign up / register page */}
        <p style={{ marginTop: "20px", fontWeight: 600 }}>
          Don't have an account?{" "}
          <Link to="/rsignup" style={{ textDecoration: "underline" }}>
            Register here
          </Link>
        </p>
      </section>
    </div>
  );
}