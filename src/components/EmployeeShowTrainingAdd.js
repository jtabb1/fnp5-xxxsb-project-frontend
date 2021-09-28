import { useEffect, useState } from "react";

function EmployeeShowTrainingAdd({ employeeId, onAddDisplayTask }) {
  const [taskId, setTaskId] = useState("");
  const [tasks, setTasks] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/tasks")
      .then((r) => r.json())
      .then(setTasks);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      task_id: Number(taskId),
      employee_id: employeeId,
    };
    fetch("/trainings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((task) => {
          setTaskId("");
          setErrors([]);
          onAddDisplayTask(task);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Training</h2>
      <div>
        <label htmlFor="task_id">Task</label>
        <select
          id="task_id"
          value={taskId}
          onChange={(e) => setTaskId(e.target.value)}
        >
          <option value="">Select task...</option>
          {tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.task_name}
            </option>
          ))}
        </select>
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

export default EmployeeShowTrainingAdd;
