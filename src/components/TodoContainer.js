import React, { useEffect, useState } from "react";

import '../styles/TodoContainer.css'

export default function TodoContainer() {
  const [todos, setTodos] = useState([]);

  // READ

  useEffect(() => {
    fetch(`/todos`)
      .then((res) => res.json())
      .then(setTodos)
  }, []);
  
  return (
      <div>
        <h2 className="home-page-header">Todo List</h2>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>
                {todo.type_name}: {todo.name}
              </span> 
            </li>
          ))}
        </ul>
      </div>
  );
}
