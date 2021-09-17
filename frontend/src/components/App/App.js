import { useState } from "react";
import "./App.scss";
import { TodoList, TodoForm } from "..";

function App() {
  const [todos, setTodos] = useState([]);
  function addTodo(todo) {
    todo.id = String(Math.random());
    todo.done = false;
    setTodos((prev) => [todo, ...prev]);
  }
  function deleteTodo(todo) {
    setTodos((prev) => prev.filter((t) => t.id !== todo.id));
  }
  return (
    <div data-testid="App" className="App">
      <TodoForm handleSubmit={addTodo} />
      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
