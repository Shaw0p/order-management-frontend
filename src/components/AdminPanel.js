// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import { getAllOrders, updateOrder } from "../api";

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders", error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await updateOrder(id, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) => (order.id === id ? updated : order))
      );
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  return (
    <div className="container fade-in">
      <h2>Admin Panel - Manage Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Price:</strong> ₹{order.price}</p>
          <p><strong>Status:</strong> 
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
