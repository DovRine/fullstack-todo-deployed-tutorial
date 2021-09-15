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
  return (
    <div data-testid="App" className="App">
      <TodoForm handleSubmit={addTodo} />
      <TodoList todos={todos} />
    </div>
  );
}

export default App;
