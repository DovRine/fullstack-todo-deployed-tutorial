import { EmptyList, Todo } from "..";

function TodoList({ todos = [], deleteTodo = { deleteTodo } }) {
  return (
    <div data-testid="TodoList" className="TodoList">
      {todos.length ? (
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} />
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export { TodoList };
export default TodoList;
