import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./styles/auth.css";  // Import auth styles
import "./styles/movies.css"; // Import movie page styles
import LoginPage from "./LoginPage";
import MoviesPage from "./MoviesPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
