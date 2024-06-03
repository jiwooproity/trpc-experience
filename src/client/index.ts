import { createTRPCClient, unstable_httpBatchStreamLink } from "@trpc/client";

import type { Router } from "../server/index.js";

const trpc = createTRPCClient<Router>({
  links: [
    unstable_httpBatchStreamLink({
      url: "http://localhost:3000",
    }),
  ],
});

const loadAPI = async () => {
  // SELECT: *
  const movies = await trpc.movies.list.query();
  console.log("Movies: ", movies);

  // SELECT: WHERE
  const movie = await trpc.movies.search.query("분노의 질주");
  console.log("Search Movie: ", movie);

  // INSERT
  await trpc.movies.create.query({ id: 3, title: "모아나2" });

  // DELETE
  await trpc.movies.delete.query(3);

  // SELECT: USER, AUTH, WORK TABLE JOIN
  const users = await trpc.users.list.query();
  console.log("Users: ", users);
};

loadAPI();
