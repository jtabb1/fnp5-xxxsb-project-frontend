import React, { useEffect, useState } from "react";

import '../styles/TrainingContainer.css'

export default function TrainingContainer() {
  const [trainings, setTrainings] = useState([]);

  // READ

  useEffect(() => {
    fetch(`/trainings`)
      .then((res) => res.json())
      .then(setTrainings)
  }, []);
  
  return (
      <div>
        <h2 className="home-page-header">Training List</h2>
        <ul>
          {trainings.map((training) => (
            <li key={training.id}>
              <span>
                {training.task_name}: {training.name}
              </span> 
            </li>
          ))}
        </ul>
      </div>
  );
}
