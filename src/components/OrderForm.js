// src/components/OrderForm.js
import React, { useState } from "react";
import { createOrder } from "../api";
import { useNavigate } from "react-router-dom";

function OrderForm() {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createOrder({ productName, price });
      navigate("/");
    } catch (error) {
      console.error("Failed to create order", error);
    }
  };

  return (
    <div className="container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}

export default OrderForm;
