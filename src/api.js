

// src/api.js

const API_BASE_URL = "http://localhost:8080/api/orders";

// Create a new order
export async function createOrder(order) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to create order");
  }

  return response.json();
}

// Get all orders
export async function getAllOrders() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch orders");
  }

  return response.json();
}

// Get an order by ID
export async function getOrderById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch order");
  }

  return response.json();
}

// Delete an order by ID
export async function deleteOrder(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete order");
  }
}
