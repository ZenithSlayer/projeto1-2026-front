import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faInfoCircle,
  faShoppingCart,
  faTachometerAlt
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const menu = [
    { name: "Home", path: "/", icon: faHome },
    { name: "About", path: "/about", icon: faInfoCircle },
    ...(isLoggedIn
      ? [{ name: "Cart", path: "/cart", icon: faShoppingCart}]
      : []),
    ...(isLoggedIn
      ? [{ name: "Dashboard", path: "/dashboard", icon: faTachometerAlt}]
      : []),
  ];

  return (
    <aside
      className="sidebar"
      style={{ width: isOpen ? "220px" : "70px" }}
    >
      {menu.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`link ${isActive ? "active" : ""} ${
              isOpen ? "open" : "closed"
            }`}
          >
            <FontAwesomeIcon icon={item.icon} />
            {isOpen && <span>{item.name}</span>}
          </Link>
        );
      })}
    </aside>
  );
};

export default Sidebar;