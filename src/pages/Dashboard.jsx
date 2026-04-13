import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setToast }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(null);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
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
  const [activeTab, setActiveTab] = useState("orders"); // Default tab

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }

    fetch("http://localhost:3001/users/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const { user, orders, addresses, cards } = data;
        setUserData(user);
        setOrders(orders);
        setAddresses(addresses);
        setCards(cards);
        setLoadingOrders(false);
        setLoadingAddresses(false);
        setLoadingCards(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoadingOrders(false);
        setLoadingAddresses(false);
        setLoadingCards(false);
      });
  }, [navigate]);

  const handlePasswordChange = (input) => {
    input.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/users/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    })
      .then((response) => response.json())
      .then(() => {
        setShowPasswordForm(false);
        setToast({
          message: "Password updated successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          message: `Error: ${err.message}`,
          type: "error",
        });
      });
  };

  const handleAddAddress = (input) => {
    input.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/users/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(addressForm),
    })
      .then((response) => response.json())
      .then(() => {
        setAddressForm({
          country: "",
          state: "",
          city: "",
          street: "",
          number: "",
          postal_code: "",
        });
        setToast({
          message: "Address added successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          message: `Error: ${err.message}`,
          type: "error",
        });
      });
  };

  const handleAddCard = (input) => {
    input.preventDefault();
    const token = localStorage.getItem("token");

    fetch("http://localhost:3001/users/card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(cardForm),
    })
      .then((response) => response.json())
      .then(() => {
        setCardForm({
          card_number: "",
          security_code: "",
          expiration_date: "",
        });
        setToast({
          message: "Card added successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          message: `Error: ${err.message}`,
          type: "error",
        });
      });
  };

  const handleDeleteAddress = (addressId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/users/address/${addressId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setAddresses(addresses.filter((address) => address.id !== addressId));
        setToast({
          message: "Address deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          message: `Error: ${err.message}`,
          type: "error",
        });
      });
  };

  const handleDeleteCard = (cardId) => {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:3001/users/card/${cardId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then(() => {
        setCards(cards.filter((card) => card.id !== cardId));
        setToast({
          message: "Card deleted successfully!",
          type: "success",
        });
      })
      .catch((err) => {
        setToast({
          message: `Error: ${err.message}`,
          type: "error",
        });
      });
  };

  return (
    <div>
      <h1>Welcome, {userData ? userData.name : "User"}!</h1>

      <div>
        <button
          onClick={() => setActiveTab("orders")}
          style={{
            backgroundColor: activeTab === "orders" ? "#ccc" : "#fff",
            padding: "10px",
            marginRight: "5px",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab("addresses")}
          style={{
            backgroundColor: activeTab === "addresses" ? "#ccc" : "#fff",
            padding: "10px",
            marginRight: "5px",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          Addresses
        </button>
        <button
          onClick={() => setActiveTab("cards")}
          style={{
            backgroundColor: activeTab === "cards" ? "#ccc" : "#fff",
            padding: "10px",
            marginRight: "5px",
            border: "1px solid #ddd",
            cursor: "pointer",
          }}
        >
          Credit Cards
        </button>
      </div>

      {activeTab === "orders" && (
        <div>
          <h2>Your Orders</h2>
          {loadingOrders ? (
            <p>Loading orders...</p>
          ) : (
            orders && orders.length > 0 ? (
              <ul>
                {orders.map((order) => (
                  <li key={order.id}>
                    Order #{order.id} - Status: {order.status} - Total: ${order.total}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No orders available.</p>
            )
          )}
        </div>
      )}

      {activeTab === "addresses" && (
        <div>
          <h2>Your Addresses</h2>
          {loadingAddresses ? (
            <p>Loading addresses...</p>
          ) : (
            addresses && addresses.length > 0 ? (
              <ul>
                {addresses.map((address) => (
                  <li key={address.id}>
                    {address.street}, {address.city}, {address.state}, {address.country}
                    <button onClick={() => handleDeleteAddress(address.id)} style={{ marginLeft: '10px', color: 'red' }}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No addresses available.</p>
            )
          )}

          <h3>Add New Address</h3>
          <form onSubmit={handleAddAddress}>
            <input
              type="text"
              placeholder="Country"
              value={addressForm.country}
              onChange={(input) => setAddressForm({ ...addressForm, country: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="State"
              value={addressForm.state}
              onChange={(input) => setAddressForm({ ...addressForm, state: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="City"
              value={addressForm.city}
              onChange={(input) => setAddressForm({ ...addressForm, city: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Street"
              value={addressForm.street}
              onChange={(input) => setAddressForm({ ...addressForm, street: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Number"
              value={addressForm.number}
              onChange={(input) => setAddressForm({ ...addressForm, number: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Postal Code"
              value={addressForm.postal_code}
              onChange={(input) => setAddressForm({ ...addressForm, postal_code: input.target.value })}
            />
            <button type="submit">Add Address</button>
          </form>
        </div>
      )}

      {activeTab === "cards" && (
        <div>
          <h2>Your Credit Cards</h2>
          {loadingCards ? (
            <p>Loading credit cards...</p>
          ) : (
            cards && cards.length > 0 ? (
              <ul>
                {cards.map((card) => (
                  <li key={card.id}>
                    Card ending in {card.card_number} - Expiration: {card.expiration_date}
                    <button onClick={() => handleDeleteCard(card.id)} style={{ marginLeft: '10px', color: 'red' }}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No credit cards available.</p>
            )
          )}

          <h3>Add New Card</h3>
          <form onSubmit={handleAddCard}>
            <input
              type="text"
              placeholder="Card Number"
              value={cardForm.card_number}
              onChange={(input) => setCardForm({ ...cardForm, card_number: input.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Security Code"
              value={cardForm.security_code}
              onChange={(input) => setCardForm({ ...cardForm, security_code: input.target.value })}
              required
            />
            <input
              type="date"
              placeholder="Expiration Date"
              value={cardForm.expiration_date}
              onChange={(input) => setCardForm({ ...cardForm, expiration_date: input.target.value })}
              required
            />
            <button type="submit">Add Card</button>
          </form>
        </div>
      )}

      {/* Password Change Form */}
      {showPasswordForm && (
        <div>
          <h3>Change Password</h3>
          <form onSubmit={handlePasswordChange}>
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(input) => setNewPassword(input.target.value)}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;