import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyHabits from "./pages/MyHabits";
import NewHabit from "./pages/NewHabit";
import Profile from "./pages/Profile";
import Sleep from "./pages/habits/Sleep";
import Meditation from "./pages/habits/Meditation";
import Screentime from "./pages/habits/Screentime";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-habits" element={<MyHabits />} />
      <Route path="/new-habit" element={<NewHabit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/habits/sleep" element={<Sleep />} />
      <Route path="/habits/meditation" element={<Meditation />} />
      <Route path="/habits/screentime" element={<Screentime />} />
    </Routes>
  );
}