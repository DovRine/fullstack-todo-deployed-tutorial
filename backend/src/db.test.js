import * as db from "./db.js";

describe("db", () => {
  describe("listTodos", () => {
    it("exists", () => {
      expect(typeof db.listTodos).toBe("function");
    });
    it("returns an array of todos", async () => {
      const todos = await db.listTodos();
      expect(Array.isArray(todos)).toBe(true);
    });
  });
});
