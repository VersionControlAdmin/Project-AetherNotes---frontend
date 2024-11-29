import "./App.css";
import HomePage from "./pages/HomePage";
import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUp";
import PrivateNotesHomePage from "./pages/PrivateNotesPage";
import { RootLayout } from "./components/root-layout";
import Section404Page from "./pages/404Page";

function App() {
  return (
    <div className="min-h-screen">
      <RootLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/private-notes" element={<PrivateNotesHomePage />} />
          <Route path="*" element={<Section404Page />} />
        </Routes>
      </RootLayout>
    </div>
  );
}

export default App;
