import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const API_URL = "http://localhost:3001/cart";

const getToken = () => localStorage.getItem("token");

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Memoizing the fetchCart function using useCallback
  const fetchCart = useCallback(async () => {
    try {
      const res = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setCart(data.items || []);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, []); // Empty dependency array, so it only changes if something in the hook changes

  // Run fetchCart once when the component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]); // Now fetchCart is a dependency, and it won't cause infinite loops

  const addToCart = async (product, quantity) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity,
        }),
      });

      await fetchCart(); // Re-fetch cart after adding an item
    } catch (err) {
      console.error("Add to cart error:", err);
    }
  };

  const removeFromCart = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setCart((prev) => prev.filter((item) => item.id !== id)); // Update cart state
    } catch (err) {
      console.error("Remove error:", err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      await fetchCart(); // Re-fetch cart after updating quantity
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const clearCart = () => {
    setCart([]); // Clear the cart from state
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