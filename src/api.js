const BASE_URL = "https://order-backend-deploy.onrender.com/api/orders";

// Get all orders
export const fetchOrders = async () => {
  const response = await fetch(BASE_URL);
  return response.json();
};

// Get one order by ID
export const fetchOrderById = async (id) => {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
};

// Create order
export const createOrder = async (order) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });
  return response.json();
};

// Delete order
export const deleteOrder = async (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
};

// Upload invoice
export const uploadInvoice = async (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/${id}/upload-invoice`, {
    method: "POST",
    body: formData,
  });

  return response.text();
};
