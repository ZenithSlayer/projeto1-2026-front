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

        <main style={styles.main}>
          <AppRouter />
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

const styles = {
  main: {
    padding: "20px",
    minHeight: "calc(100vh - 110px)",
    background: "#f1f5f9",
    width: "100%",
  },
};

export default App;