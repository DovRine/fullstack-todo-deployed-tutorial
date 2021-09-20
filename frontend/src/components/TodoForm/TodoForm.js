import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../providers/TodoProvider";
import "./TodoForm.scss";

function TodoForm() {
  const { addTodo } = useTodos();
  const [task, setTask] = useState("");

  function doSubmit(e) {
    e.preventDefault();
    if(task){
      addTodo({ task });
      setTask("");
    }
  }
  return (
    <form data-testid="TodoForm" className="TodoForm" onSubmit={doSubmit}>
      <input
        value={task}
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
}

export { TodoForm };
export default TodoForm;
