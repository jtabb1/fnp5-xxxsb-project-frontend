import { useState } from "react";

function EmployeeHire({ onHireEmployee }) {
  const [name, setName] = useState("");
  const [employeeNum, setEmployeeNum] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name,
      public_id: Number(employeeNum),
    };
    fetch("/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((employee) => {
          setName("");
          setEmployeeNum("");
          setErrors([]);
          onHireEmployee(employee);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hire New Employee</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="employeeNum">Employee Number:</label>
        <input
          type="number"
          id="employeeNum"
          value={employeeNum}
          onChange={(e) => setEmployeeNum(e.target.value)}
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

export default EmployeeHire