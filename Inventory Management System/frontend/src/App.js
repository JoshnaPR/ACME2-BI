import React, { useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    axios.get('http://localhost:5000')
      .then((respons) => setMessage(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Breast Intentions Inventory Management System</h1>
      <p>This is the front-end of the project.</p>
    </div>
  );
}

export default App;