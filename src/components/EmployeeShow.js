import { useEffect, useState } from "react";
import { useParams } from "react-router";
import EmployeeShowTrainingAdd from "./EmployeeShowTrainingAdd";

function EmployeeShow() {
  const [{ data: employee, error, status }, setEmployee] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/employees/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((employee) =>
          setEmployee({ data: employee, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setEmployee({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  /* */
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

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{employee.name}'s Completed Trainings</h2>
      <ul>
        {employee.tasks.map((task) => (
          <li key={task.id}>
            {task.task_name} | Task Number: {task.public_id}
          </li>
        ))}
      </ul>
      <hr />
      <EmployeeShowTrainingAdd onAddDisplayTask={handleAddDisplayTask} employeeId={employee.id} />
    </div>
  );
}

export default EmployeeShow;
