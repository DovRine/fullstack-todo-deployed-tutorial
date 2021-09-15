import { useState } from "react";

function TodoForm({ handleSubmit }) {
  const [task, setTask] = useState("");
  function doSubmit(e) {
    e.preventDefault();
    handleSubmit({ task });
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
