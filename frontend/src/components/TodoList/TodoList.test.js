import { render, screen } from "@testing-library/react";
import { TodoList } from "..";
import TodoProvider from "../../providers/TodoProvider";

function customRender(Component, props) {
  return render(
    <TodoProvider values={{ ...props }}>
      <Component />
    </TodoProvider>
  );
}
describe("TodoList", () => {
  it("exists", () => {
    expect(typeof TodoList).toBe("function");
  });
  it('has class "TodoList"', () => {
    customRender(TodoList, { todos: [] });
    const ui = screen.getByTestId("TodoList");
    expect(ui).toHaveClass("TodoList");
  });
  it("shows an empty list message when no todos", () => {
    customRender(TodoList, { todos: [] });
    screen.getByTestId("EmptyList");
  });
  it("shows a list of todos", () => {
    const todos = [{ id: 1, task: "test task", done: false }];
    customRender(TodoList, { todos });
    const ui = screen.getByTestId("TodoList");
    expect(ui).toHaveTextContent(todos[0].task);
  });
  it("does not show EmptyList when we have todos", () => {
    const todos = [{ id: 1, task: "test task", done: false }];
    customRender(TodoList, { todos });
    const ui = screen.queryByTestId("EmptyList");
    expect(ui).toBeNull();
  });
});
