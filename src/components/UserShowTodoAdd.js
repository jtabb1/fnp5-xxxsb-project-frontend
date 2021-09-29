import { useEffect, useState } from "react";

function UserShowTodoAdd({ userId, onAddDisplayType }) {
  const [typeId, setTypeId] = useState("");
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetch("/types")
      .then((r) => r.json())
      .then(setTypes);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      type_id: Number(typeId),
      user_id: userId,
    };
    fetch("/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((type) => {
          setTypeId("");
          setErrors([]);
          onAddDisplayType(type);
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
        <label htmlFor="type_id">Type</label>
        <select
          id="type_id"
          value={typeId}
          onChange={(e) => setTypeId(e.target.value)}
        >
          <option value="">Select type...</option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserShowTodoAdd;
