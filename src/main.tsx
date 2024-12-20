import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { GlowContainer } from "./components/glow-container.tsx";

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <GlowContainer>
    <Router>
      <App />
    </Router>
  </GlowContainer>
);
