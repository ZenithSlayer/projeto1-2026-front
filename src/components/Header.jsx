import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faRightFromBracket,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import "./Header.css";
import logo from "../assets/logo.png";

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleAuthClick = () => {
    if (isLoggedIn) {
      localStorage.removeItem("token");
      navigate("/auth");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className="header">
      <button onClick={toggleSidebar} className="menu-button">
        <FontAwesomeIcon icon={faBars} />
      </button>

      <img className="logo" src={logo} alt="Logo" />

      <button
        onClick={handleAuthClick}
        className={isLoggedIn ? "logout-button" : "auth-button"}
      >
        <FontAwesomeIcon
          icon={isLoggedIn ? faRightFromBracket : faRightToBracket}
        />
      </button>
    </header>
  );
};

export default Header;