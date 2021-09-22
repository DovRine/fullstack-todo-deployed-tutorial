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

  describe("editTodo", () => {
    it("exists", () => {
      expect(typeof db.editTodo).toBe("function");
    });
    it("edits a todo", async () => {
      const updatedTodo = { id: 1, task: "buy milk", done: true };
      const result = await db.editTodo(updatedTodo);
      expect(mockQuery).toHaveBeenCalledTimes(1);
      expect(mockQuery.mock.calls[0][1]).toEqual([
        updatedTodo.task,
        updatedTodo.done,
        updatedTodo.id,
      ]);
      expect(result).toEqual({ status: "ok" });
    });
  });
});
