import express from "express";
import sendResponse from "./helpers.js";

export default function makeApp(db) {
  const app = express();
  app.use(express.json());

  app.get("/todos", async (req, res) => {
    res.send(await db.listTodos());
  });

  app.post("/todos", async (req, res) => {
    await sendResponse({
      todo: { ...req.body },
      mode: "add",
      dbMethod: db.addTodo,
      response: res,
      status: 201,
    });
  });

  app.put("/todos", async (req, res) => {
    await sendResponse({
      todo: { ...req.body },
      mode: "edit",
      dbMethod: db.editTodo,
      response: res,
    });
  });

  app.delete("/todos", async (req, res) => {
    await sendResponse({
      todo: { ...req.body },
      mode: "delete",
      dbMethod: db.deleteTodo,
      response: res,
    });
  });

  return app;
}
