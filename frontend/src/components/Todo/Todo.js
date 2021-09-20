import { useState } from "react";
import { useTodos } from "../../providers/TodoProvider";

function BtnDelete({ handleClick }) {
  return (
    <button data-testid="BtnDelete" type="button" onClick={handleClick}>
      Delete
    </button>
  );
}

function BtnEdit({ handleClick, label }) {
  return (
    <button data-testid="BtnEdit" type="button" onClick={handleClick}>
      {label}
    </button>
  );
}

function Todo({ todo }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [task, setTask] = useState(todo?.task ?? "");

  const { deleteTodo, editTodo, toggleTodo } = useTodos();
  function handleDelete() {
    deleteTodo(todo);
  }
  function handleEdit() {
    setShowEditForm((prev) => !prev);
  }
  return (
    <div data-testid="Todo" className="Todo">
      {showEditForm ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editTodo({
              ...todo,
              task,
            });
            setTask("");
            setShowEditForm(false);
          }}
        >
          <input
            type="textbox"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
        </form>
      ) : (
        <div data-testid="TodoLabel" className={`${todo?.done ? 'done' : ''}`} onDoubleClick={() => toggleTodo(todo)}>
          {todo?.task}
        </div>
      )}
      <BtnEdit
        handleClick={handleEdit}
        label={showEditForm ? "Cancel" : "Edit"}
      />
      {!showEditForm && <BtnDelete handleClick={handleDelete} />}
    </div>
  );
}

export { Todo };
export default Todo;
