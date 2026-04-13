import React, { useEffect, useState } from "react";
import StoreItem from "../components/StoreItem";
import "./ItemRow.css";

const ItemRow = ({ onAddToCart, offset }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        setProducts(data.slice(offset, offset+4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [offset]);

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (products.length === 0) return <h2>No products available</h2>;

  return (
    <div className="products-grid">
      {products.map((item) => (
        <StoreItem key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
};

export default ItemRow;