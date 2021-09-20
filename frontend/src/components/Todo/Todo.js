import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faBan,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useTodos } from "../../providers/TodoProvider";
import "./Todo.scss";

function BtnDelete({ handleClick }) {
  return (
    <button
      data-testid="BtnDelete"
      className="BtnDelete"
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faTrashAlt} />
    </button>
  );
}

function BtnEdit({ handleClick, icon }) {
  return (
    <button
      data-testid="BtnEdit"
      className="BtnEdit"
      type="button"
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={icon} />
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
        <div
          data-testid="TodoLabel"
          className={`TodoLabel ${todo?.done ? "done" : ""}`}
          onDoubleClick={() => toggleTodo(todo)}
        >
          {todo?.task}
        </div>
      )}
      <div>
        <BtnEdit
          handleClick={handleEdit}
          icon={showEditForm ? faBan : faPencilAlt}
        />
        {!showEditForm && <BtnDelete handleClick={handleDelete} />}
      </div>
    </div>
  );
}

export { Todo };
export default Todo;
