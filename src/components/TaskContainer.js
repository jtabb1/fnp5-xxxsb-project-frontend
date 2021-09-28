import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { BASE_URL } from "../constraints/index.js";
// import Ee from "./Employee.js";

import TaskCreate from "./TaskCreate";
import TaskDiv from "./TaskDiv";

import '../styles/TaskContainer.css'

export default function TaskContainer() {
  const [tasks, setTasks] = useState([]);

  // CREATE

  function onCreateTask(newETask) {
    setTasks((tasks) => [...tasks, newETask])
  }

  // READ

  useEffect(() => {
    fetch(`/tasks`)
      .then((res) => res.json())
      .then(setTasks)
      .then(console.log);
  }, []);

  function populateTasks() {
    return tasks.map((task) => (
      <TaskDiv task={task} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} key={task.id} />
    ));
  }


  // UPDATE

  function handleUpdateTask(task) {
    fetch("/tasks/" + task.id, {
      method: "PATCH",
      body: JSON.stringify(task),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // OPTIMISTIC RENDERING

    const newTasks = tasks.map((g) => {
      if (g.id === task.id) {
        g = task;
      }
      return g;
    });
    setTasks(newTasks);
  }

  // DELETE

  function handleDeleteTask(id) {
    fetch(`/tasks/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setTasks((tasks) =>
        tasks.filter((task) => task.id !== id)
        );
      }
    });
  }
  
  return (
      <div>
        <h2 className="home-page-header">Task List</h2>
        <div className="task-container">
          {tasks && populateTasks()}
        </div>
        <TaskCreate onCreateTask={onCreateTask} />
      </div>
  );
}
