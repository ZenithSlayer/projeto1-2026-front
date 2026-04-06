import React from "react";
import ItemRow from '../components/ItemRow'
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Merch Haven!</h1>
        <ItemRow offset={0} />
        <ItemRow offset={4} />
    </div>
  );
};

export default Home;