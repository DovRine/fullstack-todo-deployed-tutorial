import { EmptyList, Todo } from "..";
import {useTodos} from '../../providers/TodoProvider'

function TodoList() {
  const {todos} = useTodos();
  return (
    <div data-testid="TodoList" className="TodoList">
      {todos.length ? (
        todos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))
      ) : (
        <EmptyList />
      )}
    </div>
  );
}

export { TodoList };
export default TodoList;
