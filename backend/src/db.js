import path from "path";
import pg from "pg";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), "..", ".env"),
});

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DB,
});

export async function listTodos() {
  const sql = "select id, task, done from todos;";
  try {
    const { rows } = await pool.query(sql);
    return rows;
  } catch (err) {
    throw err;
  }
}

export async function editTodo(todo){
  const sql = "update table todos set task='$1', done=$2 where id=$3"
  const params = [todo.task, todo.done, todo.id]
  try{
    await pool.query(sql, params)
    return {status: 'ok'}
  }catch(err){
    throw err;
  }
}
