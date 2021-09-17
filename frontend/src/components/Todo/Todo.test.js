import { render, screen } from "@testing-library/react";
import { Todo } from "..";

describe("Todo", () => {
  it("exists", () => {
    expect(typeof Todo).toBe("function");
  });
  it('has class "Todo"', () => {
    render(<Todo />);
    const ui = screen.getByTestId("Todo");
    expect(ui).toHaveClass("Todo");
  });
  it("shows the task of a todo", () => {
    const todo = { id: 1, task: "test task", done: false };
    render(<Todo todo={todo} />);
    const ui = screen.getByTestId("Todo");
    expect(ui).toHaveTextContent(todo.task);
  });
  it("has a delete button", () => {
    const todo = { id: 1, task: "test task", done: false };
    const deleteTodo = jest.fn();
    render(<Todo todo={todo} deleteTodo={deleteTodo} />);
    const btn = screen.getByTestId("BtnDelete");
    btn.click();
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });
});
