import React, { useEffect, useState } from "react";

const Toast = ({ message, type = "error", duration = 4000, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true); // fade-in
    const timer = setTimeout(() => setVisible(false), duration); // start fade-out

    const closeTimer = setTimeout(() => onClose?.(), duration + 500); // remove after fade-out
    return () => {
      clearTimeout(timer);
      clearTimeout(closeTimer);
    };
  }, [duration, onClose]);

  const backgroundColor = type === "success" ? "#4caf50" : "#f44336";

  return (
    <div style={{
      position: "fixed",
      top: 20,
      left: "50%",
      transform: "translateX(-50%)",
      background: backgroundColor,
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.5s ease, transform 0.5s ease",
      transformOrigin: "top center",
      transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-20px)"
    }}>
      {message}
    </div>
  );
};

export default Toast;