import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
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
              New here? <a href="#">Create an account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}