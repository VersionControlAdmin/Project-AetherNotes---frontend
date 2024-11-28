import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUp";

function App() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed inset-0 -z-10 h-screen w-screen flex justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_23%,#4a4a4a_3%,#34495e_38%,#2c5282_77%,#FD00FB_95%)]" />
      <div className="min-h-screen flex items-center justify-center App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
