import { useState } from "react";

function TaskCreate({ onCreateTask }) {
  const [task_name, setName] = useState("");
  const [taskNum, setTaskNum] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      task_name,
      public_id: Number(taskNum),
    };
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((task) => {
          setName("");
          setTaskNum("");
          setErrors([]);
          onCreateTask(task);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create New Task</h2>
      <div>
        <label htmlFor="task_name">Name:</label>
        <input
          type="text"
          id="task_name"
          value={task_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="taskNum">Task Number:</label>
        <input
          type="number"
          id="taskNum"
          value={taskNum}
          onChange={(e) => setTaskNum(e.target.value)}
        />
      </div>
      {errors.map((err) => (
        <p key={err} style={{ color: "red" }}>
          {err}
        </p>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
}

export default TaskCreate