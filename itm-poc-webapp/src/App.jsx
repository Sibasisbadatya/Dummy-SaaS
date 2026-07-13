import { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import SideNav from "./components/SideNav";
import MainContainer from "./components/MainContainer";

function App() {
  const [activeModule, setActiveModule] = useState("dashboard");

  return (
    <div className="app-shell">
      <AppHeader />
      <div className="app-body">
        <SideNav active={activeModule} onNavigate={setActiveModule} />
        <MainContainer active={activeModule} />
      </div>
    </div>
  );
}

export default App;
