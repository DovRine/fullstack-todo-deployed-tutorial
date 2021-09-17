import "./App.scss";
import { TodoList, TodoForm } from "..";
import TodoProvider from "../../providers/TodoProvider";

function App() {
  return (
    <div data-testid="App" className="App">
      <TodoProvider>
        <TodoForm />
        <TodoList />
      </TodoProvider>
    </div>
  );
}

export default App;
