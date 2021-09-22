import express from "express";

export default function makeApp() {
  const app = express();

  app.get("/todos", (req, res) => {
    res.send([]);
  });

  return app;
}
