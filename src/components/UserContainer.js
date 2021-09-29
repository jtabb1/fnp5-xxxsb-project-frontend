import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import zzUserHire from "./UserHire";
import '../styles/UserContainer.css'

export default function UserContainer() {
  const [users, setUsers] = useState([]);

  // READ

  useEffect(() => {
    fetch(`/users`)
      .then((res) => res.json())
      .then(setUsers)
  }, []);
  
  // function onHireUser(newUser) {
  //   setUsers((users) => [...users, newUser])
  // }

  return (
      <div>
        <h2 className="home-page-header">User List</h2>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.user_name} -&gt; &nbsp;
              </span>
              <Link to={`/users/${user.id}`}>Details</Link>
            </li>
          ))}
        </ul>
        {/* <zzUserHire onHireUser={onHireUser} /> */}
      </div>
  );
}
