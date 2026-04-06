import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard 🎉</p>

      <div style={{ marginTop: "20px" }}>
        <h3>Quick Stats</h3>
        <ul>
          <li>Users: 120</li>
          <li>Sales: $2,450</li>
          <li>Orders: 32</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;