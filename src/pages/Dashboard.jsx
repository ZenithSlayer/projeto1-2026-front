import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./style/Dashboard.css";

const API_URL = "http://localhost:3001/users";
const PRODUCTS_URL = "http://localhost:3001/products";

const getToken = () => localStorage.getItem("token");

const Dashboard = ({ setToast }) => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);

  const [activeTab, setActiveTab] = useState("orders");
  const [loading, setLoading] = useState(true);

  const [editingProduct, setEditingProduct] = useState(null);

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

  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
  });

  const authHeaders = () => ({
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  });

  const fetchUserDashboardData = async () => {
    try {
      const token = getToken();
      console.log('Token:', token);
      if (!token) return navigate("/login");

      const response = await fetch(`${API_URL}/me`, {
        headers: authHeaders(),
      });

      const responseData = await response.json();

      setUserData(responseData.user);
      setOrders(responseData.orders || []);
      setAddresses(responseData.addresses || []);
      setCards(responseData.cards || []);
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCTS_URL);
      const data = await response.json();
      setProducts(data);
    } catch {
      setToast({ message: "Error loading products", type: "error" });
    }
  };

  useEffect(() => {
    fetchUserDashboardData();
  }, []);

  useEffect(() => {
    if (userData?.is_admin) fetchProducts();
  }, [userData]);

  const handleAddressFieldChange = (field, value) => {
    setAddressForm((p) => ({ ...p, [field]: value }));
  };

  const handleCardFieldChange = (field, value) => {
    setCardForm((p) => ({ ...p, [field]: value }));
  };

  const createAddress = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/address`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(addressForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setAddresses((p) => [...p, data.address]);
      setToast({ message: "Address added", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  const deleteAddress = async (id) => {
    try {
      await fetch(`${API_URL}/address/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      setAddresses((p) => p.filter((a) => a.id !== id));
    } catch {
      setToast({ message: "Error deleting address", type: "error" });
    }
  };

  const setFavoriteAddress = async (id) => {
    try {
      const res = await fetch(`${API_URL}/address/${id}/favorite`, {
        method: "PUT",
        headers: authHeaders(),
      });

      setToast({ message: "Favorite Update", type: "success" });
      if (!res.ok) throw new Error();

      setAddresses((p) =>
        p.map((a) => ({ ...a, is_favorite: a.id === id }))
      );
    } catch {
      setToast({ message: "Error updating favorite", type: "error" });
    }
  };

  const createCard = async (e) => {
    e.preventDefault();

    const { card_number, security_code, expiration_date } = cardForm;

    if (!card_number || !security_code || !expiration_date) {
      return setToast({
        message: "All fields are required",
        type: "error",
      });
    }

    if (card_number.length < 16) {
      return setToast({
        message: "Card number must be 16 digits",
        type: "error",
      });
    }

    if (security_code.length < 3) {
      return setToast({
        message: "Invalid security code",
        type: "error",
      });
    }

    try {
      const response = await fetch(`${API_URL}/card`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify(cardForm),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setCards((p) => [...p, data.card]);
      setToast({ message: "Card added", type: "success" });

      setCardForm({
        card_number: "",
        security_code: "",
        expiration_date: "",
      });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  const deleteCard = async (id) => {
    try {
      await fetch(`${API_URL}/card/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      setCards((p) => p.filter((c) => c.id !== id));
    } catch {
      setToast({ message: "Error deleting card", type: "error" });
    }
  };

  const setFavoriteCard = async (id) => {
    try {
      const res = await fetch(`${API_URL}/card/${id}/favorite`, {
        method: "PUT",
        headers: authHeaders(),
      });

      setToast({ message: "Favorite Update", type: "success" });
      if (!res.ok) throw new Error();

      setCards((p) =>
        p.map((c) => ({ ...c, is_favorite: c.id === id }))
      );
    } catch {
      setToast({ message: "Error updating favorite", type: "error" });
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(PRODUCTS_URL, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setProducts((p) => [...p, data.product]);
      setToast({ message: "Product created", type: "success" });
      setProductForm({ name: "", description: "", price: "", image_url: "" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${PRODUCTS_URL}/${editingProduct.id}`,
        {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify({
            ...productForm,
            price: parseFloat(productForm.price),
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      setProducts((p) =>
        p.map((x) => (x.id === editingProduct.id ? data.product : x))
      );

      setEditingProduct(null);
      setProductForm({ name: "", description: "", price: "", image_url: "" });

      setToast({ message: "Product updated", type: "success" });
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    }
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(`${PRODUCTS_URL}/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      setProducts((p) => p.filter((x) => x.id !== id));
    } catch {
      setToast({ message: "Error deleting product", type: "error" });
    }
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;

  const tabs = ["orders", "addresses", "cards"];
  if (userData?.is_admin) tabs.push("products");

  return (
    <div className="dashboard-container">
      <h1>Welcome, {userData?.name || "User"}!</h1>

      <div className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={activeTab === t ? "active" : ""}
            onClick={() => setActiveTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === "orders" && (
          <div className="panel">
            <h2>Orders</h2>
            {orders.length === 0 ? (
              <div>No orders available</div>
            ) : (
              orders.map((o) => (
                <div key={o.id} className="item">
                  #{o.id} - {o.status} - ${o.total}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="panel">
            <h2>Addresses</h2>
            {addresses.map((a) => (
              <div key={a.id} className="item">
                <FontAwesomeIcon
                  icon={a.is_favorite ? solidStar : regularStar}
                  onClick={() => setFavoriteAddress(a.id)}
                />
                {a.street}, {a.city}, {a.state}, {a.country}
                <button onClick={() => deleteAddress(a.id)}>Delete</button>
              </div>
            ))}

            <form onSubmit={createAddress} className="form">
              <input placeholder="Country" onChange={(e) => handleAddressFieldChange("country", e.target.value)} />
              <input placeholder="State" onChange={(e) => handleAddressFieldChange("state", e.target.value)} />
              <input placeholder="City" onChange={(e) => handleAddressFieldChange("city", e.target.value)} />
              <input placeholder="Street" onChange={(e) => handleAddressFieldChange("street", e.target.value)} />
              <input placeholder="Number" onChange={(e) => handleAddressFieldChange("number", e.target.value.replace(/\D/g, ""))} />
              <button type="submit">Add Address</button>
            </form>
          </div>
        )}

        {activeTab === "cards" && (
          <div className="panel">
            <h2>Cards</h2>
            {cards.map((c) => (
              <div key={c.id} className="item">
                <FontAwesomeIcon
                  icon={c.is_favorite ? solidStar : regularStar}
                  onClick={() => setFavoriteCard(c.id)}
                />
                Card {c.security_code}
                <button onClick={() => deleteCard(c.id)}>Delete</button>
              </div>
            ))}

            <form onSubmit={createCard} className="form">
              <input maxLength={16} inputMode="numeric" pattern="[0-9]*" placeholder="Card Number" onChange={(e) => handleCardFieldChange("card_number", e.target.value.replace(/\D/g, ""))} />
              <input maxLength={4} inputMode="numeric" pattern="[0-9]*" placeholder="Security Code" onChange={(e) => handleCardFieldChange("security_code", e.target.value.replace(/\D/g, ""))} />
              <input type="date" onChange={(e) => handleCardFieldChange("expiration_date", e.target.value)} />
              <button type="submit">Add Card</button>
            </form>
          </div>
        )}

        {activeTab === "products" && userData?.is_admin && (
          <div className="panel">
            <h2>Products</h2>

            {products.map((p) => (
              <div key={p.id} className="item">
                {p.name} - ${p.price}
                <button onClick={() => startEditProduct(p)}>Edit</button>
                <button onClick={() => deleteProduct(p.id)}>Delete</button>
              </div>
            ))}

            <form onSubmit={editingProduct ? updateProduct : createProduct} className="form">
              <input value={productForm.name} placeholder="Name" onChange={(e) => setProductForm({ ...productForm, name: e.target.value })} />
              <input value={productForm.description} placeholder="Description" onChange={(e) => setProductForm({ ...productForm, description: e.target.value })} />
              <input value={productForm.price} placeholder="Price" onChange={(e) => setProductForm({ ...productForm, price: e.target.value })} />
              <input value={productForm.image_url} placeholder="Image URL" onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })} />

              <button type="submit">
                {editingProduct ? "Update Product" : "Add Product"}
              </button>

              {editingProduct && (
                <button type="button" onClick={() => {
                  setEditingProduct(null);
                  setProductForm({ name: "", description: "", price: "", image_url: "" });
                }}>
                  Cancel
                </button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;