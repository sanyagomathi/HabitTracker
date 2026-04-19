import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NewHabit() {
  const navigate = useNavigate();

  const templates = {
    meditation: {
      title: "Meditation",
      category: "Health",
      frequency: "Once a day",
      target: "10 mins"
    },
    sleep: {
      title: "Sleep Before 11 PM",
      category: "Health",
      frequency: "Once a day",
      target: "11:00 PM"
    },
    screentime: {
      title: "Limit Screentime",
      category: "Personal",
      frequency: "Once a day",
      target: "2 hrs max"
    },
    workspace: {
      title: "Organize Workspace",
      category: "Personal",
      frequency: "Once a day",
      target: "10 mins"
    },
    expenses: {
      title: "Track Expenses",
      category: "Personal",
      frequency: "Once a day",
      target: "All entries"
    }
  };

  const [formData, setFormData] = useState({
    template: "",
    title: "",
    category: "Health",
    frequency: "Once a day",
    target: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "template") {
      if (!value) {
        setFormData({
          template: "",
          title: "",
          category: "Health",
          frequency: "Once a day",
          target: "",
        });
        return;
      }

      const selectedTemplate = templates[value];

      setFormData({
        template: value,
        title: selectedTemplate.title,
        category: selectedTemplate.category,
        frequency: selectedTemplate.frequency,
        target: selectedTemplate.target,
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      template: "",
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
        template_key: formData.template || null,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Failed to save habit");
      return;
    }

    alert("Habit saved successfully");

    const templateRoutes = {
      meditation: "/habits/meditation",
      sleep: "/habits/sleep",
      screentime: "/habits/screentime",
      workspace: "/habits/workspace",
      expenses: "/habits/expenses",
    };

    if (formData.template && templateRoutes[formData.template]) {
      navigate(templateRoutes[formData.template]);
    } else {
      navigate(`/habits/${data.id}`);
    }
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

        <div className="form-group">
          <label>Select Template</label>
          <select
            name="template"
            value={formData.template}
            onChange={handleChange}
          >
            <option value="">Custom</option>
            <option value="meditation">Meditation</option>
            <option value="sleep">Sleep</option>
            <option value="screentime">Screentime</option>
            <option value="workspace">Organize Workspace</option>
            <option value="expenses">Track Expenses</option>
          </select>
        </div>

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