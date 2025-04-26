"use client";

import { useEffect, useState } from "react";
import AddMovieForm from "./AddMovieForm";
import { Button } from "./ui/button";
import BarsArrow from "./icons/bars-arrow";
import OutlineStar from "./icons/outline-star";
import { ModeToggle } from "./ui/theme-toggle";
import { MovieDetails } from "@/types/movie-types";
import MovieList from "./MovieList";

export default function MovieApp() {
  const [movies, setMovies] = useState<MovieDetails[]>([]);

  useEffect(() => {
    const movies = fetchMovies();
    setMovies(movies);
  }, []);

  const fetchMovies = () => {
    const storedMovies = localStorage.getItem("movies");
    if (!storedMovies) {
      return [];
    }

    const movies = JSON.parse(storedMovies);
    return movies;
  };

  const storeMovies = (movies: MovieDetails[]) => {
    localStorage.setItem("movies", JSON.stringify(movies));
  };

  const onAddMovie = (title: string, rating: number) => {
    setMovies((previousMovies) => {
      const newMovie = { title: title, rating: rating };
      storeMovies([...previousMovies, newMovie]);
      return [...previousMovies, newMovie];
    });
  };

  const onDeleteMovie = (movieIndex: number) => {
    const lessMovies = movies.toSpliced(movieIndex, 1);
    setMovies(lessMovies);
    storeMovies(lessMovies);
  };

  const onSortAlpha = () => {
    const sortedMovies = movies.toSorted((a, b) =>
      a.title.localeCompare(b.title),
    );
    setMovies(sortedMovies);
    storeMovies(sortedMovies);
  };

  const onSortRating = () => {
    const sortedMovies = movies.toSorted((a, b) => b.rating - a.rating);
    setMovies(sortedMovies);
    storeMovies(sortedMovies);
  };

  return (
    <div className="flex w-full flex-col p-4">
      <div className="flex justify-between">
        <h1 className="mb-4 text-2xl">My movie list</h1>
        <ModeToggle />
      </div>

      <AddMovieForm onAddMovie={onAddMovie} />

      <h2 className="mt-4 border-b-4 py-2 text-xl">Saved movies</h2>
      <div className="min-h-1/2 grow overflow-y-scroll overscroll-y-contain">
        <MovieList movies={movies} onDeleteMovie={onDeleteMovie} />
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-1">
        <Button onMouseDown={() => onSortAlpha()} className="grow">
          Order by name
          <span>
            <BarsArrow />
          </span>
        </Button>
        <Button onMouseDown={() => onSortRating()} className="grow">
          Order by rating
          <span>
            <OutlineStar />
          </span>
        </Button>
      </div>
    </div>
  );
}
