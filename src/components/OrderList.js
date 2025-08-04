// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import { Link, useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error loading orders", error);
      }
    }
    fetchData();
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="container fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>All Orders</h2>
        <div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          {isAdmin && <button onClick={handleLogout} style={{ marginLeft: "10px" }}>Logout</button>}
        </div>
      </div>

      {orders.map((order) => (
        <div key={order.id} className="order-card fade-in" style={{ marginBottom: "20px" }}>
          <h4>{order.productName}</h4>
          <p>Price: ₹{order.price}</p>
          <Link to={`/orders/${order.id}`}>
            <button>View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default OrderList;
