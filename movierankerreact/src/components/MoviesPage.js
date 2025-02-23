import React, { useEffect, useState } from "react";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch("http://localhost:3000/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
        });
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movie Ranker</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
