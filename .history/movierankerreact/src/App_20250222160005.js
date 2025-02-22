import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    const apiUrl = "http://localhost:3000";
    console.log('Fetching from:', apiUrl); // Check the logged URL
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);
  
  

  return (
    <p>${a}</p>
  );
}

export default App;
