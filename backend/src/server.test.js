import { jest } from "@jest/globals";
import supertest from "supertest";
import makeApp from "./server.js";

const addTodo = jest.fn();
const listTodos = jest.fn();

const db = {
  addTodo,
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
    async function doAddTodo(returnId=1) {
      addTodo.mockResolvedValue({ id:  returnId});
      return await supertest(app)
        .post("/todos")
        .set("Accept", "application/json")
        .send(todo);
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
    // TODO: returns status 400 on invalid input
  });
});
