import { MovieDetails } from "@/types/movie-types";
import Movie from "./Movie";

type Props = {
  movies: MovieDetails[];
  onDeleteMovie: (movieIndex: number) => void;
};

export default function MovieList(props: Props) {
  return (
    <ul className="w-full">
      {props.movies.map((movie, index) => {
        return (
          <li key={index} className="border-b-2 last:border-b-0">
            <Movie
              title={movie.title}
              rating={movie.rating}
              onDeleteMovie={() => props.onDeleteMovie(index)}
            />
          </li>
        );
      })}
    </ul>
  );
}
