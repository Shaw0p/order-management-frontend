// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";

import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/Login";

function App() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <Router>
      <div className="navbar">
        <Link to="/">Orders</Link> | 
        <Link to="/create">Create Order</Link> | 
        <Link to="/admin">Admin</Link>
      </div>

      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/create" element={<OrderForm />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin-panel"
          element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
