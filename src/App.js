import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Orders</Link> | <Link to="/create">Create Order</Link>
        </nav>
        <Routes>
          <Route path="/" element={<OrderList />} />
          <Route path="/create" element={<OrderForm />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
