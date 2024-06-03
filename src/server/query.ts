import mysql from "mysql";
import DB_CONFIG from "./db-config.js";

const connection = mysql.createConnection(DB_CONFIG);

export const selectMethod = async <T>(query: string): Promise<T> => {
  return await new Promise((resolve) => {
    connection.query(query, (error, results) => {
      if (error) throw error;
      resolve(results);
    });
  });
};

export const insertMethod = (query: string) => {
  connection.query(query, (error) => {
    if (error) throw error;
  });
};

export const deleteMethod = (query: string) => {
  connection.query(query, (error) => {
    if (error) throw error;
  });
};
