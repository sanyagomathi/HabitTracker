import { Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import MyHabits from "./pages/MyHabits";
import NewHabit from "./pages/NewHabit";
import Profile from "./pages/Profile";
import Sleep from "./pages/habits/Sleep";
import Meditation from "./pages/habits/Meditation";
import Screentime from "./pages/habits/Screentime";
import TrackExpenses from "./pages/habits/TrackExpenses";
import OrganizeWorkspace from "./pages/habits/OrganizeWorkspace";
import Progress from "./pages/Progress";
import CalendarPage from "./pages/CalendarPage";
import Settings from "./pages/Settings";
import DeleteAccount from "./pages/DeleteAccount";
import HabitDetail from "./pages/HabitDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/habits/workspace/:id" element={<OrganizeWorkspace />} />
      <Route path="/habits/expenses/:id" element={<TrackExpenses />} />
      <Route path="/habits/meditation/:id" element={<Meditation />} />
      <Route path="/habits/sleep/:id" element={<Sleep />} />
      <Route path="/habits/screentime/:id" element={<Screentime />} />
      <Route path="/habits/:id" element={<HabitDetail />} />
      <Route path="/" element={<Splash />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/my-habits" element={<MyHabits />} />
      <Route path="/new-habit" element={<NewHabit />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/settings" element={<Settings />} /> 
      <Route path="/delete-account" element={<DeleteAccount />} />
    </Routes>
  );
}