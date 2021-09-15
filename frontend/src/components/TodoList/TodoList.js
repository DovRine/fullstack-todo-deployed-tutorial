import { EmptyList, Todo } from "..";

function TodoList({ todos = [] }) {
  return (
    <div data-testid="TodoList" className="TodoList">
      {todos.length ? (
        todos.map((todo) => <Todo key={todo.id} todo={todo} />)
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export { TodoList };
export default TodoList;
