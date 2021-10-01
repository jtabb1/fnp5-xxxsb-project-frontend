import React, { useState } from "react";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router";

function TodoShow({ todoIn }) {  
  const [{ data: todo, error, status }, setTodo] = useState({
    data: null,
    error: null,
    status: "pending",
  });

  if (!todoIn) {
    // const { id } = useParams(); 
    // useEffect(() => {
    //   fetch(`/todos/${id}`).then((r) => {
    //     if (r.ok) {
    //       r.json().then((todo) =>
    //       setTodo({ data: todo, error: null, status: "resolved" })
    //       );
    //     } else {
    //       r.json().then((err) =>
    //       setTodo({ data: null, error: err.error, status: "rejected" })
    //       );
    //     }
    //   });
    // }, [id]);
  } else {
    const todo = todoIn;
    const id = todo.id;
    setTodo({ data: todoIn, error: null, status: "resolved" });
  }
  /* 
  function handleAddDisplayTask(newTask) {
    setEmployee({
      error,
      status,
      data: {
        ...employee,
        tasks: [...employee.tasks, newTask],
      },
    });
  }
  /* */
  function handleUpdateTodo(e) {
    const id = 4;
    e.preventDefault();
    fetch("/todos/" + id, {
      method: "PATCH",
      body: JSON.stringify(todo),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
  });

    // OPTIMISTIC RENDERING

    const newTypes = types.map((g) => {
      if (g.id === type.id) {
        g = type;
      }
      return g;
    });
    setTypes(newTypes);
  }

  function handleChange(e) {
    const updatedValue = { ...newTodo };
    updatedValue[e.target.name] = e.target.value;
    setNewType({ ...updatedValue });
  }
      
  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{todo.todo_name}</h2>
      <form onSubmit={handleUpdateTodo}>
            <input 
              name="todo_name" 
              value={newTodo.todo_name} 
              onChange={handleChange} 
            />
            <input 
              name="todo_notes" 
              value={newTodo.todo_notes} 
              onChange={handleChange} 
            />
            <button type="submit">Update Type</button>
          </form>
    </div>
  );
}

export default TodoShow;
