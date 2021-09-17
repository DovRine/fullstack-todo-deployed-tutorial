function BtnDelete({ handleClick }) {
  return (
    <button data-testid="BtnDelete" type="button" onClick={handleClick}>
      Delete
    </button>
  );
}
function Todo({ todo, deleteTodo }) {
  function handleDelete(){
    deleteTodo(todo);
  }
  return (
    <div data-testid="Todo" className="Todo">
      {todo?.task}
      <BtnDelete handleClick={handleDelete} />
    </div>
  );
}

export { Todo };
export default Todo;
