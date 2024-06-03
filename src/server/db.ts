import fs from "fs";
import data from "./movies.json";
import path from "path";

type Movies = { id: number; title: string };

const movies: Movies[] = data;
export const db = {
  movies: {
    all: async () => {
      const dataBuffer = fs.readFileSync(path.resolve(__dirname, "./movies.json"));
      const dataJson = dataBuffer.toString();
      return JSON.parse(dataJson);
    },
    search: async (title: string) => {
      return movies.find((movie) => movie.title === title);
    },
    create: async (movie: Movies) => {
      const concatMovie = movies.concat(movie);
      fs.writeFileSync(path.resolve(__dirname, "./movies.json"), JSON.stringify(concatMovie));
    },
  },
};
