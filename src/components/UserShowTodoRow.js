import React, { useState } from "react";
// import { Link } from "react-router-dom";
import '../styles/UserShowTodoRow.css'


// import TodoShow from "./TodoShow"; 

function UserShowTodoRow({ todo, onDeleteTodo, onUpdateTodo }) {
  const [newTodo, setNewTodo] = useState({ ...todo });
  const [editMode, setEditMode] = useState(false);

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewTodo({ ...updatedValue });
  }

  function toggleEdit() {
    setEditMode(!editMode);
  }

  function handleUpdate(e) {
    e.preventDefault();
    onUpdateTodo(newTodo);
    setEditMode(false);
  }

  return (
    <>
    <li>
      {todo.todo_name} &nbsp;
      {editMode ? 
      <button onClick={toggleEdit}>Cancel Edit</button>
      : <button onClick={toggleEdit}>Edit To-do</button>}
      {/* <button onClick={toggleEdit}>Edit</button> */}
      <button onClick={()=>onDeleteTodo(todo.id)}>Done</button>
    </li>
    {editMode && (
      <form onSubmit={handleUpdate}>
        <li className="no_bullet">
          <input 
            name="todo_name" 
            value={newTodo.todo_name} 
            onChange={handleChange} 
          />
          <button type="submit">Update To-do</button>
        </li>
      </form>
    )}
    </>
  );
}

export default UserShowTodoRow;
