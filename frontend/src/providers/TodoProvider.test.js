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
  it("provides an deleteTodo function", () =>{
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
});
