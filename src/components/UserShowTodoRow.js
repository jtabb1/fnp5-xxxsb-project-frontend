import React from "react";
// import { Link } from "react-router-dom";

// import TodoShow from "./TodoShow"; 

function UserShowTodoRow({ todo, onDeleteTodo }) {

  return (
    <li>
      {todo.todo_name} &nbsp;
      <button onClick={()=>onDeleteTodo(todo.id)}>Done</button>
    </li>
  );
}

export default UserShowTodoRow;
