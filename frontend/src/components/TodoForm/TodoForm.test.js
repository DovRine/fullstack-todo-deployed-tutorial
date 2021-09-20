import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TodoProvider from "../../providers/TodoProvider";
import { TodoForm } from "..";

function customRender(Component, props) {
  return render(
    <TodoProvider values={{ ...props }}>
      <Component />
    </TodoProvider>
  );
}

describe("TodoForm", () => {
  it("exists", () => {
    expect(typeof TodoForm).toBe("function");
  });
  it('has class "TodoForm"', () => {
    customRender(TodoForm, {addTodo: jest.fn()})
    const ui = screen.getByTestId("TodoForm");
    expect(ui).toHaveClass("TodoForm");
  });
  it("has an input for a todo task", () => {
    customRender(TodoForm, {addTodo: jest.fn()})
    screen.getByRole("textbox");
  });
  it("has a submit button", () => {
    customRender(TodoForm, {addTodo: jest.fn()})
    screen.getByRole("button");
  });
  it('does not add a todo if task is empty', () => {
    const addTodo = jest.fn();
    customRender(TodoForm, {addTodo})
    const task = "";
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");

    userEvent.type(input, task);
    btn.click();

    expect(addTodo).toHaveBeenCalledTimes(0);
  })
  it("adds a todo", () => {
    const addTodo = jest.fn();
    customRender(TodoForm, {addTodo})
    const task = "test task";
    const input = screen.getByRole("textbox");
    const btn = screen.getByRole("button");

    userEvent.type(input, task);
    btn.click();

    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith({ task });
  });
});
