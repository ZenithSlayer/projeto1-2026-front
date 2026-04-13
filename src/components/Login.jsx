import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setToast }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.identifier)
      return setToast({ message: "Email or username is required.", type: "error" });

    if (!form.password)
      return setToast({ message: "Password is required.", type: "error" });

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);

      setToast({ message: "Login successful!", type: "success" });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Login</h2>

      <input
        type="text"
        name="identifier"
        placeholder="Email or Name"
        value={form.identifier}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;