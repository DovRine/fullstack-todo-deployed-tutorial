import { jest } from "@jest/globals";
import supertest from "supertest";
import makeApp from "./server.js";

const listTodos = jest.fn();
const db = {
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
});
