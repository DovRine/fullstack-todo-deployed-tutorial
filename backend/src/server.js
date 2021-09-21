import express from "express";

let todos = [];

export default function makeApp() {
  const app = express();
  app.use(express.json());
  app.get("/todos", (req, res) => {
    return res.json(todos);
  });
  app.post("/todos", (req, res) => {
    const todo = {
      id: Math.random(),
      task: req.body.task,
      done: false,
    };
    todos = [todo, ...todos];
    return res.status(201).json(todo);
  });

  return app;
}
