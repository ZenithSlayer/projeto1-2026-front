import React, { useEffect, useState } from "react";
import "../ItemRow.css";
import StoreItem from "../components/StoreItem";

const ItemRow = ({ onAddToCart, offset }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://192.168.0.243:3001/products");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Limit to 4 items
        setProducts(data.slice(offset, offset+4));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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