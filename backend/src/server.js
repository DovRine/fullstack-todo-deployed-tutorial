import express from "express";

function validateTodo(todo){
  if (todo.task === "") {
    throw new Error("task must not be empty");
  }
  if (!todo?.task) {
    throw new Error("missing key: task");
  }
  if (Object.keys(todo).length > 1) {
    throw new Error("only key: 'task' is allowed");
  }
  if (typeof todo.task !== "string") {
    throw new Error("only strings are allowed as tasks");
  }
}

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
  return app;
}
