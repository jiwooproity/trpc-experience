import env from "dotenv";
env.config();

const DB_CONFIG = {
  host: process.env.HOST,
  user: process.env.ROOT,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

export default DB_CONFIG;
