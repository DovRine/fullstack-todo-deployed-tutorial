import express from "express";

let todos = [];

export default function makeApp() {
  const app = express();
  app.use(express.json());
  app.get("/todos", (req, res) => {
    return res.json(todos);
  });

  return app;
}
