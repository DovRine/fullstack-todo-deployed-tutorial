import express from "express";

export default function makeApp(db) {
  const app = express();

  app.get("/todos", async (req, res) => {
    res.send(await db.listTodos());
  });

  return app;
}
