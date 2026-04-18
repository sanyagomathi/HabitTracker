import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NewHabit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Health",
    frequency: "Once a day",
    target: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "Health",
      frequency: "Once a day",
      target: "",
    });
  };

  const saveHabit = async () => {
    if (!formData.title.trim()) {
      alert("Please enter a habit name");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/api/habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          title: formData.title,
          category: formData.category,
          frequency: formData.frequency,
          target: formData.target,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to save habit");
        return;
      }

      alert("Habit saved successfully");
      navigate("/my-habits");
    } catch (error) {
      console.error("Error saving habit:", error);
      alert("Server error while saving habit");
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="panel">
        <h2>Add New Habit</h2>

        <label>NAME OF THE HABIT</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter habit name"
        />

        <label>CHOOSE YOUR CATEGORY</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option>Health</option>
          <option>Study</option>
          <option>Fitness</option>
          <option>Personal</option>
          <option>Recreational</option>
        </select>

        <label>FREQUENCY</label>
        <select
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
        >
          <option>Once a day</option>
          <option>Twice a day</option>
          <option>Thrice a day</option>
        </select>

        <label>TARGET</label>
        <input
          type="text"
          name="target"
          value={formData.target}
          onChange={handleChange}
          placeholder="Enter target"
        />

        <div className="buttons">
          <button className="primary-btn" type="button" onClick={saveHabit}>
            Save Habit
          </button>
          <button className="primary-btn" type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}