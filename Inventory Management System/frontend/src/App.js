import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; // Change Switch to Routes
import BraInventory from './pages/BraInventory'; // Ensure the path is correct
import EventInventory from './pages/EventInventory'; // Ensure the path is correct
import HomePage from './pages/HomePage'; // Import the home page

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => setMessage(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div>
        <h1>Breast Intentions Inventory Management System</h1>
        <p>{message}</p>
        
        {/* Navigation Links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/bra-inventory">Bra Inventory</Link>
            </li>
            <li>
              <Link to="/event-inventory">Event Inventory</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Home page route */}
          <Route path="/bra-inventory" element={<BraInventory />} />
          <Route path="/event-inventory" element={<EventInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
