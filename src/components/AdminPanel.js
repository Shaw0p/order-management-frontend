// src/components/AdminPanel.js
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`https://order-backend-deploy.onrender.com/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      // Refresh orders after update
      fetchOrders();
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="container fade-in">
      <h2>Admin Panel</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p><strong>Product:</strong> {order.productName}</p>
          <p><strong>Status:</strong> 
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
