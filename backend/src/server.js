import express from "express";

export default function makeApp() {
  const app = express();

  app.get("/", (req, res) => {
    return res.send("hello");
  });

  return app;
}
