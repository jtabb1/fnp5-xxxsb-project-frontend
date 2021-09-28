import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeHire from "./EmployeeHire";
import '../styles/EmployeeContainer.css'

export default function EmployeeContainer() {
  const [employees, setEmployees] = useState([]);

  // READ

  useEffect(() => {
    fetch(`/employees`)
      .then((res) => res.json())
      .then(setEmployees)
  }, []);
  
  function onHireEmployee(newEmployee) {
    setEmployees((employees) => [...employees, newEmployee])
  }

  return (
      <div>
        <h2 className="home-page-header">Employee List</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              <span>
                {employee.name}, {employee.public_id} -&gt; &nbsp;
              </span>
              <Link to={`/employees/${employee.id}`}>Details</Link>
            </li>
          ))}
        </ul>
        <EmployeeHire onHireEmployee={onHireEmployee} />
      </div>
  );
}
