import { jest } from "@jest/globals";
const mockQuery = jest.fn();
jest.mock("pg", () => ({
  Pool: jest.fn(() => ({
    query: mockQuery,
  })),
}));

const db = await import("./db.js");
const pg = await import("pg");

describe("db", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe("listTodos", () => {
    it("exists", () => {
      expect(typeof db.listTodos).toBe("function");
    });
    it("returns an array of todos", async () => {
      const testTodos = [
        { id: 1, task: "buy milk", done: false },
        { id: 2, task: "walk the dog", done: false },
      ];
      mockQuery.mockResolvedValue({
        rowCount: testTodos.length,
        rows: testTodos,
      });
      const todos = await db.listTodos();
      expect(todos).toEqual(testTodos);
      expect(mockQuery).toHaveBeenCalledTimes(1);
    });
  });
});
