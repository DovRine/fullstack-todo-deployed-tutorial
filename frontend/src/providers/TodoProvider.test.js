import React from "react";
import { render, screen } from "@testing-library/react";
import TodoProvider, { useTodos } from "./TodoProvider";

function customRender(Component, props) {
  return render(
    <TodoProvider values={{ ...props }}>
      <Component />
    </TodoProvider>
  );
}

describe("TodoProvider", () => {
  it("exists", () => {
    expect(typeof TodoProvider).toBe("function");
  });
  it("exports a useTodos custom hook", () => {
    expect(typeof useTodos).toBe("function");
  });
  it("provides a list of todos", () => {
    const TestComponent = () => {
      const { todos } = useTodos();
      return (
        <div>
          {todos.map((t) => (
            <div key={t.id}>{t.task}</div>
          ))}
        </div>
      );
    };
    const todos = [{ id: 1, task: "test task", done: false }];
    customRender(TestComponent, { todos });
    screen.getByText(todos[0].task);
  });
  it("provides an addTodo function", () => {
    const newTask = { task: "test task" };
    const TestComponent = () => {
      const { addTodo } = useTodos();
      addTodo(newTask);
      return null;
    };
    const addTodo = jest.fn();
    customRender(TestComponent, { addTodo });
    expect(addTodo).toHaveBeenCalledTimes(1);
    expect(addTodo).toHaveBeenCalledWith(newTask);
  });
  it("provides a deleteTodo function", () =>{
    const task = { id: 1, task: "test task", done: false };
    const TestComponent = () => {
      const { deleteTodo } = useTodos();
      deleteTodo(task);
      return null;
    };
    const deleteTodo = jest.fn();
    customRender(TestComponent, { deleteTodo });
    expect(deleteTodo).toHaveBeenCalledTimes(1);
    expect(deleteTodo).toHaveBeenCalledWith(task);
  });
  it("provides an editTodo function", () =>{
    const task = { id: 1, task: "test task", done: false };
    const TestComponent = () => {
      const { editTodo } = useTodos();
      editTodo(task);
      return null;
    };
    const editTodo = jest.fn();
    customRender(TestComponent, { editTodo });
    expect(editTodo).toHaveBeenCalledTimes(1);
    expect(editTodo).toHaveBeenCalledWith(task);
  });
  it("provides a toggleTodo function", () =>{
    const task = { id: 1, task: "test task", done: false };
    const TestComponent = () => {
      const { toggleTodo } = useTodos();
      toggleTodo(task);
      return null;
    };
    const toggleTodo = jest.fn();
    customRender(TestComponent, { toggleTodo });
    expect(toggleTodo).toHaveBeenCalledTimes(1);
    expect(toggleTodo).toHaveBeenCalledWith(task);
  });
});
