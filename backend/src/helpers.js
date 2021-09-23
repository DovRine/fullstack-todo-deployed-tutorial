export function validateTodo(todo, mode = "add") {
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

export async function sendResponse({
  todo,
  dbMethod,
  mode,
  response,
  status = 200,
}) {
  try {
    validateTodo(todo, mode);
    response.status(status).send(await dbMethod(todo));
  } catch (err) {
    response.status(400).send({ err });
  }
}

export default sendResponse;
