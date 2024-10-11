import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BraManager from './components/BraList'; // Ensure the path is correct
import EventManager from './components/EventList'; // Ensure the path is correct

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((response) => setMessage(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Breast Intentions Inventory Management System</h1>
      <p>{message}</p>
      
      <h2>Bra Inventory Management</h2>
      <BraManager /> {/* Include the BraManager component */}

      <h2>Event/Client Management</h2>
      <EventManager /> {/* Include the EventManager component */}
    </div>
  );
}

export default App;
