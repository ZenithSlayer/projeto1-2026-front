import React from "react";
import "./StoreItem.css"; // import the CSS file
import { useNavigate } from "react-router-dom";

const StoreItem = ({ item, onAddToCart }) => {
  const navigate = useNavigate();

  return (
    <div
      className="store-item"
      onClick={() => navigate(`/product/${item.id}`, { replace: true })}
    >
      <img src={item.image} alt={item.name} />
      <h3>{item.id}</h3>
      <h3>{item.name}</h3>
      <p className="description">{item.description}</p>
      <p className="price">${item.price}</p>
      <button onClick={() => onAddToCart(item)}>Add to Cart</button>
    </div>
  );
};

export default StoreItem;
