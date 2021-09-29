import { useState } from "react";

function UserHire({ onHireUser }) {
  const [user_name, setName] = useState("");
  const [userNum, setUserNum] = useState("");
  const [errors, setErrors] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      user_name,
      public_id: Number(userNum),
    };
    fetch("/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setName("");
          setUserNum("");
          setErrors([]);
          onHireUser(user);
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hire New User</h2>
      <div>
        <label htmlFor="user_name">Name:</label>
        <input
          type="text"
          id="user_name"
          value={user_name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="userNum">User Number:</label>
        <input
          type="number"
          id="userNum"
          value={userNum}
          onChange={(e) => setUserNum(e.target.value)}
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

export default UserHire