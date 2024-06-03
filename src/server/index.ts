import { initTRPC } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { z } from "zod";
import { db } from "./db.js";

const t = initTRPC.create();

const router = t.router({
  movies: {
    list: t.procedure.query(async () => {
      return await db.movies.all();
    }),
    search: t.procedure.input(z.string()).query(async (opts) => {
      const { input } = opts;
      return await db.movies.search(input);
    }),
    create: t.procedure
      .input(
        z.object({
          id: z.number(),
          title: z.string(),
        })
      )
      .query(async (opts) => {
        const { input } = opts;
        db.movies.create(input);
      }),
    delete: t.procedure.input(z.number()).query(async (opts) => {
      const { input } = opts;
      db.movies.delete(input);
    }),
  },
});

export type Router = typeof router;

const PORT = 3000;
const server = createHTTPServer({ router });
server.listen(PORT, () => console.log(`${PORT}: 서버가 실행되었습니다.`));
