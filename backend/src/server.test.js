import { jest } from "@jest/globals";
import supertest from "supertest";
import makeApp from "./server.js";

const addTodo = jest.fn();
const deleteTodo = jest.fn();
const editTodo = jest.fn();
const listTodos = jest.fn();

const db = {
  addTodo,
  deleteTodo,
  editTodo,
  listTodos,
};

const app = makeApp(db);

describe("server", () => {
  beforeEach(() => jest.clearAllMocks());
  it("exists", () => {
    expect(typeof makeApp).toBe("function");
    expect(typeof app).toBe("function");
  });
  describe("GET /todos - list todos", () => {
    it("returns status 200", async () => {
      const res = await supertest(app).get("/todos");
      expect(res.statusCode).toBe(200);
    });
    it("returns content-type json", async () => {
      listTodos.mockResolvedValue([]);
      const res = await supertest(app).get("/todos");
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("returns an array of todos", async () => {
      listTodos.mockResolvedValue([]);
      const res = await supertest(app).get("/todos");
      expect(Array.isArray(res.body)).toBe(true);
      expect(listTodos).toHaveBeenCalledTimes(1);
    });
  });

  describe("POST /todos - add todo", () => {
    let todo = { task: "buy milk" };
    async function doAddTodo(returnId = 1, newTodo = todo) {
      addTodo.mockResolvedValue({ id: returnId });
      return await supertest(app)
        .post("/todos")
        .set("Accept", "application/json")
        .send(newTodo);
    }
    it("return content-type json", async () => {
      const res = await doAddTodo();
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("return 201 status code", async () => {
      const res = await doAddTodo();
      expect(res.statusCode).toBe(201);
    });
    it("return the id of the newly added todo", async () => {
      const randomId = Math.floor(Math.random() * 100) + 1;
      const res = await doAddTodo(randomId);
      expect(res.body).toEqual({ id: randomId });
      expect(addTodo).toHaveBeenCalledTimes(1);
      expect(addTodo.mock.calls[0][0]).toEqual(todo);
    });
    it('returns 400 if todo is not an object with a single key "task" or has a task with an empty string', async () => {
      let todoMissingKey = {};
      let res;
      res = await doAddTodo(1, todoMissingKey);
      expect(res.statusCode).toBe(400);

      let todoWithExtraKeys = { task: "buy milk", done: false };
      res = await doAddTodo(1, todoWithExtraKeys);
      expect(res.statusCode).toBe(400);

      let todoWithEmptyTask = { task: "" };
      res = await doAddTodo(1, todoWithEmptyTask);
      expect(res.statusCode).toBe(400);

      let todoWithNonStringTask = { task: {} };
      res = await doAddTodo(1, todoWithNonStringTask);
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /todos - edit todo", () => {
    let todo = { id: 1, task: "buy milk", done: false };
    async function doEditTodo(updatedTodo) {
      editTodo.mockResolvedValue({ status: "ok" });
      return await supertest(app)
        .put("/todos")
        .set("Accept", "application/json")
        .send(updatedTodo);
    }
    it("returns content-type json", async () => {
      const res = await doEditTodo();
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("returns status 200", async () => {
      const res = await doEditTodo(todo);
      expect(res.statusCode).toBe(200);
    });
    it('returns {status: "ok"} on success', async () => {
      const updatedTodo = { ...todo, done: true };
      const res = await doEditTodo(updatedTodo);
      expect(res.body).toEqual({ status: "ok" });
      expect(editTodo).toHaveBeenCalledTimes(1);
      expect(editTodo.mock.calls[0][0]).toEqual(updatedTodo);
    });
    it("returns status 400 if object shape is not: {id: int, task: str, done: bool}", async () => {
      const brokenTodos = [
        {},
        { id: 1 },
        { task: "test" },
        { done: false },
        { id: 1, task: "test" },
        { id: 1, done: false },
        { task: "test", done: false },
        { id: 0, task: "test", done: false },
        { id: NaN, task: "test", done: true },
        { id: 1, task: "test", done: undefined },
      ];
      for (let brokenTodo of brokenTodos) {
        const res = await doEditTodo(brokenTodo);
        expect(res.statusCode).toBe(400);
      }
    });
  });

  describe("DELETE /todos - delete todo", () => {
    let todo = { id: 1, task: "buy milk", done: true };
    async function doDeleteTodo(todoToDelete) {
      deleteTodo.mockResolvedValue({ status: "ok" });
      return await supertest(app)
        .delete("/todos")
        .set("Accept", "application/json")
        .send(todoToDelete);
    }
    it("returns content-type json", async () => {
      const res = await doDeleteTodo(todo);
      expect(res.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });
    it("returns status 200", async () => {
      const res = await doDeleteTodo(todo);
      expect(res.statusCode).toBe(200);
    });
    it('returns {status: "ok"} on success', async () => {
      const todoToDelete = { ...todo, done: true };
      const res = await doDeleteTodo(todoToDelete);
      expect(res.body).toEqual({ status: "ok" });
      expect(deleteTodo).toHaveBeenCalledTimes(1);
      expect(deleteTodo.mock.calls[0][0]).toEqual(todoToDelete);
    });
    it("returns status 400 if object shape is not: {id: int, task: str, done: bool}", async () => {
      const brokenTodos = [
        {},
        { id: 1 },
        { task: "test" },
        { done: false },
        { id: 1, task: "test" },
        { id: 1, done: false },
        { task: "test", done: false },
        { id: 0, task: "test", done: false },
        { id: NaN, task: "test", done: true },
        { id: 1, task: "test", done: undefined },
      ];
      for (let brokenTodo of brokenTodos) {
        const res = await doDeleteTodo(brokenTodo);
        expect(res.statusCode).toBe(400);
      }
    });
  });
});
