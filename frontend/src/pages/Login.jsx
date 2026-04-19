import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.querySelector("#email").value;
    const password = e.target.querySelector("#password").value;

    try {
      const res = await fetch("http://localhost:5001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.error || "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Server error");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-panel">
          <h1>Welcome Back!</h1>
          <span className="subtitle">Ready to crush your goals?</span>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="hello@example.com" required />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="••••••••" required />
            </div>

            <button type="submit" className="login-btn">
              Log In →
            </button>
          </form>

          <div className="footer-links">
            <p>
              New here? <Link to="/Signup">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}