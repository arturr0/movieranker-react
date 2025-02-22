import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import './App.css';

async function App() {
            const email = 'aaaa';
            const password = 'dddd';
            
            console.log(`Attempting to ${endpoint} with email:`, email); // Debugging
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
                    alert(data.error || 'Login failed!');
                    return;
                }
                
                if (data.token) {
                    console.log('Token received:', data.token);
                    localStorage.setItem('jwt', data.token);
                    
                    if (endpoint === 'login') {
                        window.location.href = '/movies';
                    } else {
                        alert('Account created successfully! Please log in.');
						document.getElementById('title').textContent = 'Log in'
                    }
                } else {
                    alert('Unexpected response. No token received.');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                alert('An error occurred. Check the console.');
            }

  return (
    <p>{message}</p>  // ✅ Correctly display message
  );
}

export default App;
