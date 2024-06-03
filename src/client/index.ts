import { createTRPCClient, unstable_httpBatchStreamLink } from "@trpc/client";

import type { Router } from "../server/index.js";

const trpc = createTRPCClient<Router>({
  links: [
    unstable_httpBatchStreamLink({
      url: "http://localhost:3000",
    }),
  ],
});

const load = async () => {
  let movies = await trpc.movies.list.query();

  console.log("Movies: ", movies);

  const searchMovie = await trpc.movies.search.query("모아나2");

  console.log("Search Movie: ", searchMovie);

  await trpc.movies.create.query({ id: 5, title: "범죄도시" }).then(async () => {
    movies = await trpc.movies.list.query();

    console.log("Updated Movies: ", movies);
  });
};

load();
