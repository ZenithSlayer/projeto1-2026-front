import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API_URL = "http://localhost:3001/cart";

const getToken = () => localStorage.getItem("token");

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  });

  // 🔄 Load cart from backend
  const fetchCart = async () => {
    try {
      const res = await fetch(API_URL, {
        headers: authHeaders(),
      });

      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, quantity) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }),
      });

      await fetchCart();
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  // ❌ Remove item
  const removeFromCart = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      setCart((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  // 🔁 Update quantity
  const updateQuantity = async (id, quantity) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ quantity }),
      });

      await fetchCart();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};