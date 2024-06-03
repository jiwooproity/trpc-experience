import { selectMethod, insertMethod, deleteMethod } from "./query.js";

export type Movies = { id: number; title: string };

type Auth = "admin" | "user" | "guest";
type Part = "Front-end" | "Back-End" | "User";
export type Users = { name: string; auth: Auth; part: Part };

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
  users: {
    all: async () => {
      let query = "SELECT user.name, auth.name as auth, work.part FROM user ";
      query += "JOIN auth_name as auth on user.auth = auth.auth ";
      query += "JOIN work on user.work = work.workno";
      const users = await selectMethod<Users[]>(query);
      return users;
    },
  },
};
