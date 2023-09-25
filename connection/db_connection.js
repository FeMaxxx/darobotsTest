import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const { HOST, USER, PASSWORD, DATABACE } = process.env;

const db = mysql.createConnection({
  host: HOST,
  user: USER,
  password: PASSWORD,
  database: DATABACE,
});

db.connect(err => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("Connected to the remote database!");
});

export default db;
