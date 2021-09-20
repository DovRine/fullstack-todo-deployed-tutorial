import React, { useState, useContext } from "react";

const TodoContext = React.createContext();

function useTodos() {
  return useContext(TodoContext);
}

function TodoProvider({ children, values }) {
  const [todos, setTodos] = useState([]);
  function addTodo(todo) {
    todo.id = String(Math.random());
    todo.done = false;
    setTodos((prev) => [todo, ...prev]);
  }

  function deleteTodo(todo) {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  }

  function editTodo(todo) {
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? todo : t)));
  }
  function toggleTodo(todo) {
    todo.done = !todo.done;
    editTodo(todo);
  }
  return (
    <TodoContext.Provider
      value={{
        addTodo: values?.addTodo ? values?.addTodo : addTodo,
        deleteTodo: values?.deleteTodo ? values?.deleteTodo : deleteTodo,
        editTodo: values?.editTodo ? values?.editTodo : editTodo,
        todos: values?.todos ? values?.todos : todos,
        toggleTodo: values?.toggleTodo ? values?.toggleTodo : toggleTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoProvider, useTodos };
export default TodoProvider;
