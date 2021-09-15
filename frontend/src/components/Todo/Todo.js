function Todo({ todo }) {
  return (
    <div data-testid="Todo" className="Todo">
      {todo?.task}
    </div>
  );
}

export { Todo };
export default Todo;
