import { useState } from "react";
import { useTodos } from "../../providers/TodoProvider";

function TodoForm() {
  const { addTodo } = useTodos();

  const [task, setTask] = useState("");
  function doSubmit(e) {
    e.preventDefault();
    addTodo({ task });
    setTask("");
  }
  return (
    <form data-testid="TodoForm" className="TodoForm" onSubmit={doSubmit}>
      <input type="text" onChange={(e) => setTask(e.target.value)} />
      <input type="submit" value="Add Todo" />
    </form>
  );
}

export { TodoForm };
export default TodoForm;
