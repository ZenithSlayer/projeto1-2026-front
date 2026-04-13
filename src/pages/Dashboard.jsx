import React, { useEffect, useState } from "react";
import Toast from "../components/Toast";
import "./Dashboard.css";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("profile");
  const [toast, setToast] = useState(null);

  const [address, setAddress] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postal_code: "",
  });

  const [card, setCard] = useState({
    card_number: "",
    security_code: "",
    expiration_date: "",
  });

  const [profile, setProfile] = useState({
    email: "",
    password: "",
  });

  const fetchData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load user");
      setData(json);
      setProfile({ ...profile, email: json.user.email });
    } catch (err) {
      setToast(err.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleToast = (msg) => setToast(msg);

  const handleAddressSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/users/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });
    const json = await res.json();
    if (!res.ok) return handleToast(json.error || "Failed to save address");
    handleToast("Address saved!");
    fetchData();
    setAddress({ country: "", state: "", city: "", street: "", number: "", postal_code: "" });
  };

  const handleCardSubmit = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/users/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(card),
    });
    const json = await res.json();
    if (!res.ok) return handleToast(json.error || "Failed to save card");
    handleToast("Card saved!");
    fetchData();
    setCard({ card_number: "", security_code: "", expiration_date: "" });
  };

  const handleProfileUpdate = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/users/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(profile),
    });
    const json = await res.json();
    if (!res.ok) return handleToast(json.error || "Failed to update profile");
    handleToast("Profile updated!");
    fetchData();
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Are you sure you want to delete your account?")) return;
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:3001/users/delete", {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    if (!res.ok) return handleToast(json.error || "Failed to delete account");
    handleToast("Account deleted!");
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (loading) return <p style={{ padding: 20 }}>Loading...</p>;
  if (!data) return <p style={{ padding: 20 }}>Failed to load dashboard</p>;

  const { user, addresses = [], cards = [] } = data;

  return (
    <div className="dashboard-container">
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}

      <h1>Welcome {user.name} 👋</h1>

      <div className="section-buttons">
        <button onClick={() => setActiveSection("profile")}>Profile</button>
        <button onClick={() => setActiveSection("addresses")}>Addresses</button>
        <button onClick={() => setActiveSection("cards")}>Cards</button>
      </div>

      {activeSection === "profile" && (
        <div className="card">
          <h2>Profile</h2>
          <input
            type="email"
            placeholder="Email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="New Password"
            value={profile.password}
            onChange={(e) => setProfile({ ...profile, password: e.target.value })}
          />
          <button className="bottom-btn" onClick={handleProfileUpdate}>
            Save Profile
          </button>
          <button className="bottom-btn delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>
        </div>
      )}

      {activeSection === "addresses" && (
        <div className="card">
          <h2>Addresses</h2>
          <div className="form-row">
            {["country", "state", "city", "street", "number", "postal_code"].map((field) => (
              <input
                key={field}
                placeholder={field.replace("_", " ").toUpperCase()}
                value={address[field]}
                onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
              />
            ))}
          </div>
          <button className="bottom-btn" onClick={handleAddressSubmit}>
            Save Address
          </button>
          <h3>Saved Addresses</h3>
          {addresses.map((a) => (
            <p key={a.id}>{`${a.street}, ${a.number} - ${a.city}`}</p>
          ))}
        </div>
      )}

      {activeSection === "cards" && (
        <div className="card">
          <h2>Cards</h2>
          <div className="form-row">
            <input
              placeholder="Card Number"
              value={card.card_number}
              maxLength={19}
              onChange={(e) =>
                setCard({ ...card, card_number: e.target.value.replace(/\D/g, "") })
              }
            />
            <input
              placeholder="Security Code"
              value={card.security_code}
              maxLength={4}
              onChange={(e) =>
                setCard({ ...card, security_code: e.target.value.replace(/\D/g, "") })
              }
            />
            <input
              placeholder="Expiration Date (YYYY-MM-DD)"
              value={card.expiration_date}
              onChange={(e) =>
                setCard({
                  ...card,
                  expiration_date: e.target.value.replace(/[^\d-]/g, "").slice(0, 10),
                })
              }
            />
          </div>
          <button className="bottom-btn" onClick={handleCardSubmit}>
            Save Card
          </button>
          <h3>Saved Cards</h3>
          {cards.map((c) => (
            <p key={c.id}>**** **** **** {c.card_number?.slice(-4)}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;