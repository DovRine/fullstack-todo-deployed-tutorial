import express from "express";

function validateTodo(todo, mode = "add") {
  if (todo.task === "") {
    throw new Error("task must not be empty");
  }
  if (!todo?.task) {
    throw new Error("missing key: task");
  }
  if (mode === "add") {
    if (Object.keys(todo).length > 1) {
      throw new Error("only key: 'task' is allowed");
    }
  }
  if (typeof todo.task !== "string") {
    throw new Error("only strings are allowed as tasks");
  }
  if (mode === "edit" || mode === "delete") {
    // require {id: int, task: string, done: bool
    const requiredFields = ["id", "task", "done"];
    requiredFields.forEach((fld) => {
      if (!todo.hasOwnProperty("id")) {
        throw new Error("missing one or more fields of [id, task, done]");
      }
    });
    if (Object.keys(todo).length > 3) {
      throw new Error("only fields: [id, task, done] are allowed");
    }
    if (
      typeof todo.id !== "number" ||
      Math.floor(todo.id) !== todo.id ||
      todo.id < 1
    ) {
      throw new Error("id can only be an integer > 0");
    }
    if (typeof todo.done !== "boolean") {
      throw new Error("done must be a boolean");
    }
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
