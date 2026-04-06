import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    // Basic client-side validation
    if (!form.email) return setToast({ message: "Email is required.", type: "error" });
    if (!form.password) return setToast({ message: "Password is required.", type: "error" });

    try {
      const response = await fetch("http://localhost:3001/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      // Save token in localStorage
      localStorage.setItem("token", data.token);

      // Show success toast
      setToast({ message: "Login successful!", type: "success" });

      // Navigate after short delay
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="auth-container">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;