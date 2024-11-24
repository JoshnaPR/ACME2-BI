import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BraInventory from './pages/BraInventory';
import EventInventory from './pages/EventInventory';
import HomePage from './pages/HomePage';
import Login from './pages/Login'; // Add Login page import
import Signup from './pages/Signup'; // Add Signup page import
import VerifyOTP from './components/VerifyOTP'; // Import VerifyOTP component
import './styles/global.css'; // Import the global CSS

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
        {/* Add Navbar for easy navigation */}
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
            <li>
              <Link to="/login">Login</Link> {/* Link to Login */}
            </li>
            <li>
              <Link to="/signup">Signup</Link> {/* Link to Signup */}
            </li>
          </ul>
        </nav>

        {/* Display message */}
        <div>{message && <p>{message}</p>}</div>

        {/* Routes for pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bra-inventory" element={<BraInventory />} />
          <Route path="/event-inventory" element={<EventInventory />} />
          <Route path="/login" element={<Login />} /> {/* Route for Login */}
          <Route path="/signup" element={<Signup />} /> {/* Route for Signup */}
          <Route path="/verify-otp" element={<VerifyOTP />} /> {/* Route for Verify OTP (Existing users) */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import BraInventory from './pages/BraInventory';
// import EventInventory from './pages/EventInventory';
// import HomePage from './pages/HomePage';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
// import './styles/global.css'; // Import the global CSS

// function App() {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     axios
//       .get('http://localhost:5000')
//       .then((response) => setMessage(response.data))
//       .catch((error) => console.log(error));
//   }, []);

//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/bra-inventory" element={<BraInventory />} />
//           <Route path="/event-inventory" element={<EventInventory />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
