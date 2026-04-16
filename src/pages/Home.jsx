import React from "react";
import StorePage from './StorePage'
import "./style/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to 214K!</h1>
      <StorePage />
    </div>
  );
};

export default Home;