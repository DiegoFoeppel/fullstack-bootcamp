// import { Pool } from "pg";
import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  password: "hyggelig",
  host: "localhost",
  port: 5433,
  database: "world",
  max: 10,
});

export default pool;
