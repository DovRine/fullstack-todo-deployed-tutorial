import React, { useState, useEffect, useContext } from "react";

const TodoContext = React.createContext();

function useTodos() {
  return useContext(TodoContext);
}

function TodoProvider({ children, values }) {
  const [todos, setTodos] = useState([]);
  function listTodos() {
    fetch("http://localhost/api/todos")
      .then((res) => res.json())
      .then((todos) => setTodos(todos));
  }
  useEffect(() => {
    listTodos();
  }, []);
  function addTodo(todo) {
    fetch("http://localhost/api/todos", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(() => listTodos());
  }

  function deleteTodo(todo) {
    fetch("http://localhost/api/todos", {
      method: "delete",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(() => listTodos());
  }

  function editTodo(todo) {
    fetch("http://localhost/api/todos", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then(() => listTodos());
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
