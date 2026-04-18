import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NewHabit() {
  return (
    <div className="page-wrapper">
      <Navbar />

      <div className="panel">
        <h2>Add New Habit</h2>

        <form id="add-habit-form">
          <label>NAME OF THE HABIT</label>
          <input type="text" placeholder="Enter habit name" />

          <label>CHOOSE YOUR CATEGORY</label>
          <select>
            <option>Health</option>
            <option>Study</option>
            <option>Fitness</option>
            <option>Personal</option>
            <option>Recreational</option>
          </select>

          <label>DAYS</label>

          <div className="days">
            <label><input type="checkbox" /> Mon</label>
            <label><input type="checkbox" /> Tue</label>
            <label><input type="checkbox" /> Wed</label>
            <label><input type="checkbox" /> Thu</label>
            <label><input type="checkbox" /> Fri</label>
            <label><input type="checkbox" /> Sat</label>
            <label><input type="checkbox" /> Sun</label>
          </div>

          <label>FREQUENCY</label>
          <select>
            <option>Once a day</option>
            <option>Twice a day</option>
            <option>Thrice a day</option>
          </select>

          <label>NOTES</label>
          <textarea placeholder="Some extra you want to add"></textarea>

          <label>TARGET</label>
          <input type="text" placeholder="Enter target" />
        </form>

        <div className="buttons">
          <Link to="/dashboard" className="primary-btn">
            Save Habit
          </Link>
          <button className="primary-btn" type="button">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}