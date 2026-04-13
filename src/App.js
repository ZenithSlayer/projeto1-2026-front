import React, { useState } from "react";
import AppRouter from "./AppRouter";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

function App() {
  const [sidebarStatus, setSidebarStatus] = useState(false);

  return (
    <BrowserRouter>
      <Header toggleSidebar={() => setSidebarStatus(!sidebarStatus)} />

      <div style={{ display: "flex" }}>
        <Sidebar isOpen={sidebarStatus} />

        <main>
          <AppRouter />
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;