import { render, screen } from "@testing-library/react";
import { TodoList } from "..";

describe("TodoList", () => {
  it("exists", () => {
    expect(typeof TodoList).toBe("function");
  });
  it('has class "TodoList"', () => {
    render(<TodoList deleteTodo={jest.fn()} />);
    const ui = screen.getByTestId("TodoList");
    expect(ui).toHaveClass("TodoList");
  });
  it("shows an empty list message when no todos", () => {
    render(<TodoList deleteTodo={jest.fn()} />);
    screen.getByTestId("EmptyList");
  });
  it("shows a list of todos", () => {
    const todos = [{ id: 1, task: "test task", done: false }];
    render(<TodoList todos={todos} deleteTodo={jest.fn()} />);
    const ui = screen.getByTestId("TodoList");
    expect(ui).toHaveTextContent(todos[0].task);
  });
  it("does not show EmptyList when we have todos", () => {
    render(
      <TodoList
        todos={[{ id: 1, task: "test task", done: false }]}
        deleteTodo={jest.fn()}
      />
    );
    const ui = screen.queryByTestId("EmptyList");
    expect(ui).toBeNull();
  });
});
