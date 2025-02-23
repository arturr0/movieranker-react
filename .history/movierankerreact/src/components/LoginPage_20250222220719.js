import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/auth.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleFormSubmit = async (event, endpoint) => {
        event.preventDefault();
        if (password.trim() === "") return; // Only password is required

        console.log(`Attempting to ${endpoint} with input:`, email);

        try {
            const response = await fetch(`http://localhost:3000/auth/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            console.log(`Response status: ${response.status}`);

            const data = await response.json();
            console.log("Server response:", data);

            if (!response.ok) {
                alert(data.error || "Login failed!");
                return;
            }

            if (data.token) {
                console.log("Token received:", data.token);
                localStorage.setItem("jwt", data.token);

                if (endpoint === "login") {
                    navigate("/movies"); // ✅ React Router navigation
                } else {
                    alert("Account created successfully! Please log in.");
                }
            } else {
                alert("Unexpected response. No token received.");
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            alert("An error occurred. Check the console.");
        }
    };

    return (
        <div id="box">
            <div id="threejs-container"></div>
            <h1 style={{ margin: 0 }}>
                <span className="fontawesome-star"></span> <span>Movie Ranker</span> <span className="fontawesome-star"></span>
            </h1>
            <div id="title">Log in or sign up</div>
            <div id="authDiv">
                <form id="auth-form" onSubmit={(e) => handleFormSubmit(e, "login")}>
                    <input
                        type="text" // ✅ Changed from email to text
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter anything"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password (required)"
                        required
                    />
                    <div id="buttons">
                        <button type="button" onClick={(e) => handleFormSubmit(e, "register")}>Create Account</button>
                        <button type="submit">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
