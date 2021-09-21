import makeApp from "./server.js";

const app = makeApp();
const port = 8000

app.listen(port, () => {
  console.log("backend listening on", port);
});
