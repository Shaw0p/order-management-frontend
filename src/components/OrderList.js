// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import { Link } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);

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

  return (
    <div className="container">
      <h2>All Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="order-card">
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
