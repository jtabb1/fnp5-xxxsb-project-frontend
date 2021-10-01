import React from "react";
import { Link } from "react-router-dom";

// import TodoShow from "./TodoShow"; 

function UserShowTodoRow({ todo, onDeleteTodo }) {

  return (
    <li>
      <Link to={`/todos/${todo.id}`}>
        {todo.todo_name} &nbsp;
      </Link>
      <button onClick={()=>onDeleteTodo(todo.id)}>Done</button>
    </li>
  );
}

export default UserShowTodoRow;
