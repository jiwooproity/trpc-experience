import { selectMethod, insertMethod, deleteMethod } from "./query.js";

export type Movies = { id: number; title: string };

export const db = {
  movies: {
    all: async () => {
      const query = "SELECT * FROM movies";
      const movies = await selectMethod<Movies[]>(query);
      return movies;
    },
    search: async (title: string) => {
      const query = `SELECT * FROM movies WHERE title='${title}'`;
      const movies = await selectMethod<Movies>(query);
      return movies;
    },
    create: async (movie: Movies) => {
      const query = `INSERT INTO movies VALUES(${movie.id}, '${movie.title}')`;
      insertMethod(query);
    },
    delete: async (id: number) => {
      const query = `DELETE FROM movies WHERE id=${id}`;
      deleteMethod(query);
    },
  },
};
