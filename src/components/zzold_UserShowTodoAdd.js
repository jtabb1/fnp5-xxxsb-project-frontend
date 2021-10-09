
   
import { useEffect, useState } from "react";

function UserShowTodoAdd({ userId, onAddDisplayTodo }) {
  const [typeIx, setTypeIx] = useState("");
  const [types, setTypes] = useState([]);
  // const [todos, setTodos] = useState([]); For later w/ previour todos
  const [todo_name, setTodoName] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/types")
      .then((r) => r.json())
      .then((j) => {
        setTypes(j);
      });
  }, []);

  // useEffect(() => {    For later, we'll get his previous todos
  //   fetch("/users/1")
  //     .then((r) => r.json())
  //     .then((j) => {
  //       console.log(j);
  //       setTodos(j.todos);
  //     });
  // }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const ix = Number(typeIx);
    const formData = {
      type_id: types[ix].id,
      user_id: userId,
      todo_name: todo_name
    };
    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((todo) => {
          setTypeIx("");
          setErrors([]);
          onAddDisplayTodo(todo);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New To-do</h2>
      <div>
        <label htmlFor="todo_id">Enter one:</label>
        <input
          type="text"
          id="todo_name"
          value={todo_name}
          onChange={(e) => setTodoName(e.target.value)}
        />
        {/* <select
          id="todo_id"
          value={todoIx}
          onChange={(e) => setTodoIx(e.target.value)}
        >
          <option value="">Select todo...</option>
          {todos.map((todo, ix) => (
            <option key={todo.id} value={ix}>
              {todo.todo_name}
            </option>
          ))}
        </select> */}
        <select
          id="todo_id"
          value={typeIx}
          onChange={(e) => setTypeIx(e.target.value)}
        >
          <option value="">Select type...</option>
          {types.map((type, ix) => (
            <option key={type.id} value={ix}>
              {type.type_name}
            </option>
          ))}
        </select>

      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button todo="submit">Submit</button>
    </form>
  );
}

export default UserShowTodoAdd;