import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const apiUrl = "http://localhost:3000"; // Ensure this matches your backend
    console.log('Fetching from:', apiUrl); // Debugging log

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setMessage(data.message)) // ✅ Use "message" from JSON response
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <p>{message}</p>  // ✅ Correctly display message
  );
}

export default App;
