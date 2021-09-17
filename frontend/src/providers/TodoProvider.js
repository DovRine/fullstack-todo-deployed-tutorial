import React, {useState, useContext} from 'react'

const TodoContext = React.createContext();

function useTodos(){
    return useContext(TodoContext);
}

function TodoProvider({children, values}) {
    const [todos, setTodos] = useState([])
    function addTodo(todo) {
        todo.id = String(Math.random());
        todo.done = false;
        setTodos((prev) => [todo, ...prev]);
      }
    
      function deleteTodo(todo) {
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      }
    return (
        <TodoContext.Provider value={{
            addTodo: values?.addTodo ? values?.addTodo: addTodo,
            deleteTodo: values?.deleteTodo ? values?.deleteTodo: deleteTodo,
            todos: values?.todos ? values?.todos : todos,
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoProvider, useTodos };
export default TodoProvider;
