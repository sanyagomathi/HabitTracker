import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../assets/icon.png";

export default function Splash() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4500);

    const navTimer = setTimeout(() => {
      navigate("/login");
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div className={`splash-page ${fadeOut ? "fade-out" : ""}`}>
      <div className="splash-content">
        <img src={icon} alt="Catalyst Logo" className="logo-img" />
      </div>
    </div>
  );
}