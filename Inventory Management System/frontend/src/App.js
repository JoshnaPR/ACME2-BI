import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BraInventory from './pages/BraInventory';
import EventInventory from './pages/EventInventory';
import HomePage from './pages/HomePage';
import './styles/BraInventory.css'; // Import the App component's CSS
import './styles/HomePage.css'; // Import the App component's CSS

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000')
      .then((response) => setMessage(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bra-inventory" element={<BraInventory />} />
          <Route path="/event-inventory" element={<EventInventory />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
