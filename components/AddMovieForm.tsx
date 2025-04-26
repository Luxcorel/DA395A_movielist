"use client";

import { Select } from "@radix-ui/react-select";
import { Input } from "./ui/input";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useState } from "react";

type Props = {
  onAddMovie: (movieTitle: string, movieRating: number) => void;
};

export default function AddMovieForm(props: Props) {
  const [formData, setFormData] = useState({ movieTitle: "", movieRating: "" });

  const onSubmit = () => {
    const movieTitle = formData.movieTitle;
    const movieRating = Number.parseInt(formData.movieRating);
    if (!movieTitle) {
      alert("You must provide a movie title");
      return;
    }
    if (!movieRating || isNaN(movieRating)) {
      alert("You must provide a movie rating");
      return;
    }

    setFormData({ movieTitle: "", movieRating: "" });
    props.onAddMovie(movieTitle, movieRating);
  };

  return (
    <div className="w-full">
      <form action={onSubmit}>
        <fieldset>
          <legend className="mb-1 text-xl">Add a new movie</legend>

          <Input
            name="movie-title"
            placeholder="Movie title"
            value={formData.movieTitle}
            onChange={(event) =>
              setFormData((previousValue) => {
                return { ...previousValue, movieTitle: event.target.value };
              })
            }
          />

          <Select
            name="movie-rating"
            value={formData.movieRating}
            onValueChange={(value) => {
              setFormData((previousValue) => {
                return { ...previousValue, movieRating: value };
              });
            }}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="Choose movie rating here..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Movie rating</SelectLabel>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Button variant="default" className="mt-2 w-full" type="submit">
            Add movie
          </Button>
        </fieldset>
      </form>
    </div>
  );
}
