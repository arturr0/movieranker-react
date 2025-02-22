import React, { useState, useEffect } from "react";

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const registerUser = async () => {
      const email = 'aaaass';
      const password = 'dddd';
      const endpoint = 'register';

      console.log(`Attempting to ${endpoint} with email:`, email); 

      if (email.trim() === '' || password.trim() === '') return;

      try {
        const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });

        console.log(`Response status: ${response.status}`);

        const data = await response.json();
        console.log('Server response:', data);

        if (!response.ok) {
          setMessage(data.error || 'Login failed!');
          return;
        }

        if (data.token) {
          console.log('Token received:', data.token);
          localStorage.setItem('jwt', data.token);
          setMessage('Account created successfully! Please log in.');
        } else {
          setMessage('Unexpected response. No token received.');
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        setMessage('An error occurred. Check the console.');
      }
    };

    registerUser();
  }, []); // ✅ Runs only once when the component mounts

  return (
    <div>
      <h1>Authentication</h1>
      <p>{message}</p>
    </div>
  );
}

export default App;
