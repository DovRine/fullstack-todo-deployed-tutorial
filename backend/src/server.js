import express from "express";
import validateTodo from "./validateTodo";

export default function makeApp(db) {
  const app = express();
  app.use(express.json());

  app.get("/todos", async (req, res) => {
    res.send(await db.listTodos());
  });

  app.post("/todos", async (req, res) => {
    let todo;
    let retval;
    try {
      todo = { ...req.body };
      validateTodo(todo);
      retval = await db.addTodo(todo);
    } catch (err) {
      res.status(400).send({ err });
    }
    res.status(201).send(retval);
  });

  app.put("/todos", async (req, res) => {
    const todo = { ...req.body };
    try {
      validateTodo(todo, "edit");
      res.send(await db.editTodo(todo));
    } catch (err) {
      res.status(400).send({ err });
    }
  });

  app.delete("/todos", async (req, res) => {
    const todo = { ...req.body };
    try {
      validateTodo(todo, "delete");
      res.send(await db.deleteTodo(todo));
    } catch (err) {
      res.status(400).send({ err });
    }
  });

  return app;
}
