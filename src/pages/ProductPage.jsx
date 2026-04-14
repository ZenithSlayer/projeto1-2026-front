import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemRow from "../components/ItemRow";
import "./ProductPage.css";

const ProductPage = ({ onAddToCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3001/products/${id}`);

        if (!response.ok) throw new Error("Product not found");

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="product-center">
        <div className="loader">Loading product...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-center">
        <h2 className="error">{error}</h2>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="product-page">
        <div className="product-card">
          <img src={product.image_url} alt={product.name} />

          <div className="product-info">
            <h1>{product.name}</h1>
            <p>{product.description}</p>

            <h2 className="price">${Number(product.price).toFixed(2)}</h2>

            {/* QUANTITY */}
            <div className="quantity">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                -
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <button
              className="add-btn"
              onClick={() => onAddToCart(product, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="categories">
      {product.categories && (
        <div className="tags-container">
          <h3>Categories</h3>

          <div className="tags">
            {JSON.parse(product.categories).map((cat, index) => (
              <span key={index} className="tag">
                {cat}
              </span>
            ))}
          </div>
        </div>
      )}
      </div>

      <ItemRow offset={0} />
    </div>
  );
};

export default ProductPage;
