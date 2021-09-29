import { useEffect, useState } from "react";

function UserShowTodoAdd({ userId, onAddDisplayTodo }) {
  const [todoId, setTodoId] = useState("");
  const [todos, setTodos] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/users/2")
      .then((r) => r.json())
      .then((j) => setTodos(j.todos));
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      todo_id: Number(todoId),
      user_id: userId,
    };
    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Todo": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((todo) => {
          setTodoId("");
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
          value={todoId}
          onChange={(e) => setTodoId(e.target.value)}
        >
          <option value="">Select todo...</option>
          {todos.map((todo) => (
            <option key={todo.id} value={todo.id}>
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
