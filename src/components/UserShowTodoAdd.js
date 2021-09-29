import { useEffect, useState } from "react";

function UserShowTodoAdd({ userId, onAddDisplayTodo }) {
  const [todoIx, setTodoIx] = useState("");
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/users/2")
      .then((r) => r.json())
      .then((j) => setTodos(j.todos));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const ix = Number(todoIx);
    const formData = {
      type_id: todos[ix].type_id,
      user_id: userId,
      todo_name: todos[ix].todo_name
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
          setTodoIx("");
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
      <h2>Add New Todo</h2>
      <div>
        <label htmlFor="todo_id">Todo</label>
        <select
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
