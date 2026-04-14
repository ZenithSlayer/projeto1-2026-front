import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./Dashboard.css";

const Dashboard = ({ setToast }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);

  const [addressForm, setAddressForm] = useState({
    country: "",
    state: "",
    city: "",
    street: "",
    number: "",
    postal_code: "",
  });

  const [cardForm, setCardForm] = useState({
    card_number: "",
    security_code: "",
    expiration_date: "",
  });

  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [loadingCards, setLoadingCards] = useState(true);

  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    fetch("http://localhost:3001/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        setUserData(data.user);
        setOrders(data.orders || []);
        setAddresses(data.addresses || []);
        setCards(data.cards || []);
      })
      .catch((err) => setToast(err.message))
      .finally(() => {
        setLoadingOrders(false);
        setLoadingAddresses(false);
        setLoadingCards(false);
      });
  }, [navigate]);

  // FAVORITE ADDRESS
  const handleSetFavoriteAddress = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3001/users/address/${id}/favorite`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) return setToast({ message: "Error", type: "error" });

    setAddresses((prev) =>
      prev.map((a) => ({ ...a, is_favorite: a.id === id }))
    );
  };

  // FAVORITE CARD
  const handleSetFavoriteCard = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `http://localhost:3001/users/card/${id}/favorite`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!res.ok) return setToast({ message: "Error", type: "error" });

    setCards((prev) =>
      prev.map((c) => ({ ...c, is_favorite: c.id === id }))
    );
  };

  // ADD ADDRESS
  const handleAddAddress = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/users/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressForm),
    });

    const data = await res.json();

    if (!res.ok) return setToast({ message: data.error, type: "error" });

    setAddresses((prev) => [...prev, data.address]);
    setToast({ message: "Address added", type: "success" });
  };

  // ADD CARD
  const handleAddCard = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3001/users/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardForm),
    });

    const data = await res.json();

    if (!res.ok) return setToast({ message: data.error, type: "error" });

    setCards((prev) => [...prev, data.card]);
    setToast({ message: "Card added", type: "success" });
  };

  // DELETE ADDRESS
  const handleDeleteAddress = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/users/address/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setAddresses((prev) => prev.filter((a) => a.id !== id));
  };

  // DELETE CARD
  const handleDeleteCard = async (id) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:3001/users/card/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    setCards((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData?.name || "User"}!</h1>

      {/* TABS */}
      <div className="tabs">
        {["orders", "addresses", "cards"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className={`tab-content ${activeTab}`}>

        {/* ORDERS */}
        {activeTab === "orders" && (
          <div className="panel">
            <h2>Orders</h2>
            {orders.map((o) => (
              <div key={o.id} className="item">
                #{o.id} - {o.status} - ${o.total}
              </div>
            ))}
          </div>
        )}

        {/* ADDRESSES */}
        {activeTab === "addresses" && (
          <div className="panel">
            <h2>Addresses</h2>

            {addresses.map((a) => (
              <div key={a.id} className="item">
                <FontAwesomeIcon
                  icon={a.is_favorite ? solidStar : regularStar}
                  onClick={() => handleSetFavoriteAddress(a.id)}
                  className="star"
                />

                {a.street}, {a.city}, {a.state}, {a.country}

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteAddress(a.id)}
                >
                  Delete
                </button>
              </div>
            ))}

            <form onSubmit={handleAddAddress} className="form">
              <input placeholder="Country" onChange={(e) =>
                setAddressForm({ ...addressForm, country: e.target.value })
              } />
              <input placeholder="State" onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              } />
              <input placeholder="City" onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              } />
              <input placeholder="Street" onChange={(e) =>
                setAddressForm({ ...addressForm, street: e.target.value })
              } />
              <input placeholder="Number" maxLength={6} onChange={(e) =>
                setAddressForm({
                  ...addressForm,
                  number: e.target.value.replace(/\D/g, ""),
                })
              } />
              <button type="submit">Add Address</button>
            </form>
          </div>
        )}

        {/* CARDS */}
        {activeTab === "cards" && (
          <div className="panel">
            <h2>Cards</h2>

            {cards.map((c) => (
              <div key={c.id} className="item">
                <FontAwesomeIcon
                  icon={c.is_favorite ? solidStar : regularStar}
                  onClick={() => handleSetFavoriteCard(c.id)}
                  className="star"
                />

                Card {c.card_number}

                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCard(c.id)}
                >
                  Delete
                </button>
              </div>
            ))}

            <form onSubmit={handleAddCard} className="form">
              <input
                placeholder="Card Number"
                maxLength={16}
                onChange={(e) =>
                  setCardForm({
                    ...cardForm,
                    card_number: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <input
                placeholder="Security Code"
                maxLength={4}
                onChange={(e) =>
                  setCardForm({
                    ...cardForm,
                    security_code: e.target.value.replace(/\D/g, ""),
                  })
                }
              />

              <input
                type="date"
                onChange={(e) =>
                  setCardForm({
                    ...cardForm,
                    expiration_date: e.target.value,
                  })
                }
              />

              <button type="submit">Add Card</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;