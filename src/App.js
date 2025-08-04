import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";
import AdminPanel from "./components/AdminPanel";
import Login from "./pages/Login";


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Orders</Link> | 
          <Link to="/create">Create Order</Link> | 
          <Link to="/admin">Admin Panel</Link>
        </nav>

        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/create" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
