import { knex } from "knex";
import path from "path"

export const db = knex({
  client: "sqlite3",
  connection: ":memory:",
  useNullAsDefault: true,
  migrations: {
    directory: path.join(__dirname, "migrations")
  },
  seeds: {
    directory: path.join(__dirname, "seeds")
  }
});