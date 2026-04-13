import React from "react";
import ItemRow from '../components/ItemRow'
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to 214K!</h1>
        <ItemRow offset={0} />
    </div>
  );
};

export default Home;