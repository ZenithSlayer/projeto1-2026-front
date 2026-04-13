import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../components/Toast";
import "./Register.css";
import Img from "../assets/register.png";

const isValidEmail = (email) => {
  const basicCheck = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!basicCheck) return false;

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "live.com",
    "protonmail.com",
    "aol.com",
    "gmx.com",
    "yandex.com",
  ];

  const domain = email.split("@")[1].toLowerCase();
  return allowedDomains.includes(domain);
};

const isValidCPF = (cpf) => {
  if (!cpf) return false;
  const cleaned = cpf.replace(/\D/g, "");
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cleaned)) return false;
  if (/(.)\1\1/.test(cleaned)) return false;

  const seqCheck = cleaned.match(/(\d{3})/g);
  if (
    seqCheck &&
    seqCheck.some((seq, _, arr) => arr.filter((s) => s === seq).length > 1)
  )
    return false;

  const digits = cleaned.split("").map(Number);

  const calcCheckDigit = (slice) => {
    let sum = 0;
    for (let i = 0; i < slice.length; i++) {
      sum += slice[i] * (slice.length + 1 - i);
    }
    const result = (sum * 10) % 11;
    return result === 10 ? 0 : result;
  };

  const checkDigit1 = calcCheckDigit(digits.slice(0, 9));
  const checkDigit2 = calcCheckDigit(digits.slice(0, 10));

  if (digits[9] !== checkDigit1 || digits[10] !== checkDigit2) return false;

  return true;
};

const formatCPF = (cpf) => {
  const cleaned = cpf.replace(/\D/g, "").slice(0, 11);
  const parts = [];
  if (cleaned.length > 0) parts.push(cleaned.slice(0, 3));
  if (cleaned.length > 3) parts.push(cleaned.slice(3, 6));
  if (cleaned.length > 6) parts.push(cleaned.slice(6, 9));
  const last = cleaned.slice(9, 11);
  return parts.join(".") + (last ? "-" + last : "");
};

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
  });

  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "cpf") setForm({ ...form, cpf: formatCPF(value) });
    else setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast(null);

    if (!form.name.trim())
      return setToast({ message: "Name is required.", type: "error" });

    if (!form.email.trim())
      return setToast({ message: "Email is required.", type: "error" });

    if (!form.password)
      return setToast({ message: "Password is required.", type: "error" });

    if (!form.cpf.trim())
      return setToast({ message: "CPF is required.", type: "error" });

    if (form.name.trim().length < 2)
      return setToast({
        message: "Name must be at least 2 characters.",
        type: "error",
      });

    if (!isValidEmail(form.email))
      return setToast({
        message: "Please enter a valid email.",
        type: "error",
      });

    if (form.password.length < 6)
      return setToast({
        message: "Password must be at least 6 characters.",
        type: "error",
      });

    if (!isValidCPF(form.cpf))
      return setToast({
        message: "Please enter a valid CPF.",
        type: "error",
      });

    try {
      const payload = { ...form, cpf: form.cpf.replace(/\D/g, "") };

      const response = await fetch(
        "http://192.168.0.243:3001/users/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      localStorage.setItem("token", data.token);

      setToast({
        message: "Registration successful!",
        type: "success",
      });

      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="auth-container">
        <div>
          <img src={Img} alt="Register" />

          <form onSubmit={handleSubmit} noValidate>
            <h2>Register</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <input
              type="text"
              name="cpf"
              placeholder="CPF (123.456.789-10)"
              value={form.cpf}
              onChange={handleChange}
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;