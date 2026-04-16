import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { api } from "../../../services/api";

export const CardPanel = ({ data, setData, setToast }) => {
  const [form, setForm] = useState({
    card_number: "",
    security_code: "",
    expiration_date: ""
  });

  const handleFavorite = async (id) => {
    try {
      await api.put(`/users/card/${id}/favorite`);
      setData(prev => ({
        ...prev,
        cards: prev.cards.map(c => ({ ...c, is_favorite: c.id === id }))
      }));
      setToast({ message: "Favorite card updated", type: "success" });
    } catch {
      setToast({ message: "Failed to update favorite", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/card/${id}`);
      setData(prev => ({
        ...prev,
        cards: prev.cards.filter(c => c.id !== id)
      }));
    } catch {
      setToast({ message: "Error deleting card", type: "error" });
    }
  };

  const handleSubmit = async (input) => {
    input.preventDefault();
    if (form.card_number.length < 16) {
      return setToast({ message: "Card number must be 16 digits", type: "error" });
    }

    try {
      const res = await api.post("/users/card", form);
      setData(prev => ({ ...prev, cards: [...prev.cards, res.card] }));
      setForm({ card_number: "", security_code: "", expiration_date: "" });
      setToast({ message: "Card added", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  return (
    <div className="panel">
      <h2>Payment Methods</h2>
      <div className="item-list">
        {data.cards.length === 0 ? (
          <p className="empty-message">No cards saved yet.</p>
        ) : (
          data.cards.map((card) => (
            <div key={card.id} className="item">
              <div className="item-info">
                <FontAwesomeIcon
                  icon={card.is_favorite ? solidStar : regularStar}
                  className={`favorite-icon ${card.is_favorite ? "active" : ""}`}
                  onClick={() => handleFavorite(card.id)}
                />
                <span>Card ending in {card.card_number.slice(-4)}</span>
              </div>
              <button className="delete-btn" onClick={() => handleDelete(card.id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="form">
        <h3>Add New Card</h3>
        <input
          placeholder="Card Number (16 digits)"
          value={form.card_number}
          onChange={input => setForm({ ...form, card_number: input.target.value.replace(/\D/g, "") })}
          maxLength="16"
        />
        <input
          placeholder="CVV"
          value={form.security_code}
          onChange={input => setForm({ ...form, security_code: input.target.value.replace(/\D/g, "") })}
          maxLength="4"
        />
        <input
          type="date"
          value={form.expiration_date}
          onChange={input => setForm({ ...form, expiration_date: input.target.value })}
        />
        <button className="submit-btn" type="submit">Add Card</button>
      </form>
    </div>
  );
};