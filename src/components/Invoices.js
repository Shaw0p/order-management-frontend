// File: src/components/InvoicesPage.js
import React, { useEffect, useState } from "react";
import { getAllOrders } from "../api";
import { motion } from "framer-motion";

function InvoicesPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getAllOrders().then(setOrders).catch(console.error);
  }, []);

  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Uploaded Invoices</h2>
      <ul className="space-y-4">
        {orders
          .filter((order) => order.invoiceUrl)
          .map((order) => (
            <motion.li
              key={order.id}
              className="border p-4 rounded-md shadow-md hover:bg-gray-50 dark:hover:bg-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="font-semibold">{order.productName}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                ₹{order.price} — {new Date(order.orderDate).toLocaleDateString()}
              </div>
              <a
                href={order.invoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-1 inline-block"
              >
                Download Invoice
              </a>
            </motion.li>
          ))}
      </ul>
    </motion.div>
  );
}

export default InvoicesPage;
