import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setOrders).catch(console.error);
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`https://order-backend-deploy.onrender.com/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Update failed");

      // Refresh orders
      const updated = await getAllOrders();
      setOrders(updated);
    } catch (err) {
      alert("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="container fade-in">
      <h2>Admin Panel</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
          <p><strong>ID:</strong> {order.id}</p>
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
            </select>
          </p>
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
