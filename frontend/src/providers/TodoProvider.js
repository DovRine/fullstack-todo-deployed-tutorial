import React, { useState, useEffect, useContext } from "react";

const TodoContext = React.createContext();

function useTodos() {
  return useContext(TodoContext);
}

async function doFetch(method = "get", requestData, callback) {
  let options = {
    method,
  };
  if (method.toLowerCase() !== "get") {
    options = {
      ...options,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
  }
  const url = `${process.env.REACT_APP_API_URL}/todos`;
  const response = await fetch(url, options);
  const responseData = await response.json();
  callback(responseData);
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
    doFetch("post", todo, () => listTodos());
  }
  function deleteTodo(todo) {
    doFetch("delete", todo, () => listTodos());
  }
  function editTodo(todo) {
    doFetch("put", todo, () => listTodos());
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
