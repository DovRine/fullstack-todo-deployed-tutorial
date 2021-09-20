import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Todo } from "..";
import TodoProvider from "../../providers/TodoProvider";

function customRender(Component, props, todo) {
  return render(
    <TodoProvider values={{ ...props }}>
      <Component todo={todo} />
    </TodoProvider>
  );
}

describe("Todo", () => {
  it("exists", () => {
    expect(typeof Todo).toBe("function");
  });
  it('has class "Todo"', () => {
    customRender(Todo, {});
    const ui = screen.getByTestId("Todo");
    expect(ui).toHaveClass("Todo");
  });
  it("shows the task of a todo", () => {
    const todo = { id: 1, task: "test task", done: false };
    customRender(Todo, {}, todo);
    const ui = screen.getByTestId("Todo");
    expect(ui).toHaveTextContent(todo.task);
  });
  it("does not show the edit form in normal mode", () => {
    const todo = { id: 1, task: "test task", done: false };
    const deleteTodo = jest.fn();
    customRender(Todo, { deleteTodo }, todo);
    const ui = screen.queryByRole("textbox");
    expect(ui).toBeNull();
  });
  it("has a delete button", () => {
    const todo = { id: 1, task: "test task", done: false };
    const deleteTodo = jest.fn();
    customRender(Todo, { deleteTodo }, todo);
    const btn = screen.getByTestId("BtnDelete");
    btn.click();
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(todo);
  });
  it("has an edit button", () => {
    const todo = { id: 1, task: "test task", done: false };
    const newTodo = { ...todo, task: "updated task" };
    const editTodo = jest.fn();

    customRender(Todo, { editTodo }, todo);
    const btn = screen.getByTestId("BtnEdit");
    const ui = screen.getByLabelText('edit')
    expect(ui).toHaveClass("fa-pencil-alt");

    // go into edit mode
    btn.click();

    const input = screen.getByRole("textbox");

    // delete the old task before entering the new one
    for (let i = 0; i < todo.task.length; i++) {
      userEvent.type(input, "{backspace}");
    }
    // enter the new task and submit it
    userEvent.type(input, newTodo.task + "{enter}");

    expect(editTodo).toHaveBeenCalledTimes(1);
    expect(editTodo).toHaveBeenCalledWith(newTodo);

    expect(screen.queryByRole("textbox")).toBeNull();
  });
  it("does not show delete button in edit mode", () => {
    const todo = { id: 1, task: "test task", done: false };
    const editTodo = jest.fn();
    customRender(Todo, { editTodo }, todo);
    const btn = screen.getByTestId("BtnEdit");
    btn.click();
    expect(screen.queryByTestId("BtnDelete")).toBeNull();
  });
  it('changes edit button icon to indicate "Cancel" in edit mode', () => {
    const todo = { id: 1, task: "test task", done: false };
    const editTodo = jest.fn();
    customRender(Todo, { editTodo }, todo);
    const btn = screen.getByTestId("BtnEdit");
    btn.click();
    const ui = screen.getByLabelText('edit')
    expect(ui).toHaveClass("fa-ban");
  });
  it('todo done status can be toggled via doubleclick', () => {
    const todo = { id: 1, task: "test task", done: false };
    const toggleTodo = jest.fn();
    customRender(Todo, { toggleTodo }, todo);
    const ui = screen.getByTestId("TodoLabel");
    userEvent.dblClick(ui);
    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(todo);
  })
});
