import express from "express";

export default function makeApp(db) {
  const app = express();
  app.use(express.json());

  app.get("/todos", async (req, res) => {
    res.send(await db.listTodos());
  });

  app.post("/todos", async (req, res) => {
    const todo = { ...req.body };
    res.status(201).send(await db.addTodo(todo));
  });
  return app;
}
