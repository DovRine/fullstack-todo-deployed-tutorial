import makeApp from "./server.js";
import * as db from './db.js';

const app = makeApp(db);
const port = 8000

app.listen(port, () => {
  console.log("backend listening on", port);
});
