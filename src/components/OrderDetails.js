// src/components/OrderDetails.js
import React, { useEffect, useState } from "react";
import { getOrderById } from "../api";
import { useParams, useNavigate } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [statusUpdateMessage, setStatusUpdateMessage] = useState("");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  useEffect(() => {
    getOrderById(id).then(setOrder).catch(console.error);
  }, [id]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`https://order-backend-deploy.onrender.com/api/orders/${id}/upload-invoice`, {
        method: "POST",
        body: formData,
      });

      const message = await response.text();
      setUploadMessage(message);
    } catch (err) {
      console.error("Upload failed", err);
      setUploadMessage("Upload failed");
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    try {
      const response = await fetch(`https://order-backend-deploy.onrender.com/api/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const message = await response.text();
      setStatusUpdateMessage(message);
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Status update failed", err);
      setStatusUpdateMessage("Status update failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  if (!order) return <p className="fade-in">Loading...</p>;

  return (
    <div className="container fade-in">
      <h2>Order Details</h2>
      {isAdmin && (
        <button onClick={handleLogout} style={{ float: "right" }}>Logout</button>
      )}
      <div className="order-card">
        <p><strong>ID:</strong> {order.id}</p>
        <p><strong>Product:</strong> {order.productName}</p>
        <p><strong>Price:</strong> ₹{order.price}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
        {order.invoiceUrl && (
          <p>
            <strong>Invoice:</strong>{" "}
            <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer">Download</a>
          </p>
        )}
      </div>

      <hr style={{ margin: "20px 0" }} />

      {isAdmin && (
        <>
          <h3>Change Order Status</h3>
          <select value={order.status} onChange={handleStatusChange}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          {statusUpdateMessage && <p>{statusUpdateMessage}</p>}
          <hr style={{ margin: "20px 0" }} />
        </>
      )}

      <h3>Upload Invoice</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Invoice</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default OrderDetails;


// src/components/OrderList.js
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import { Link, useNavigate } from "react-router-dom";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const navigate = useNavigate();

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
          <button onClick={toggleTheme} style={{ marginRight: "10px" }}>Toggle Theme</button>
          {isAdmin && <button onClick={handleLogout}>Logout</button>}
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
