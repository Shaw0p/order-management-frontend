// File: src/components/OrderDetails.js
import React, { useEffect, useState } from "react";
import { getOrderById } from "../api";
import { useParams } from "react-router-dom";

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");

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


  if (!order) return <p>Loading...</p>;

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p><strong>ID:</strong> {order.id}</p>
      <p><strong>Product:</strong> {order.productName}</p>
      <p><strong>Price:</strong> ₹{order.price}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
      {order.invoiceUrl && (
        <p><strong>Invoice:</strong> <a href={order.invoiceUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
      )}

      <hr />

      <h3>Upload Invoice</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Invoice</button>
      {uploadMessage && <p>{uploadMessage}</p>}
    </div>
  );
}

export default OrderDetails;
