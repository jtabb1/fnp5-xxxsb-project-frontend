import { useEffect, useState } from "react";
import { useParams } from "react-router";
import UserShowTodoAdd from "./UserShowTodoAdd";

function UserShow() {
  const [{ data: user, error, status }, setUser] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const { id } = useParams();

  useEffect(() => {
    fetch(`/users/${id}`).then((r) => {
      if (r.ok) {
        r.json().then((user) =>
          setUser({ data: user, error: null, status: "resolved" })
        );
      } else {
        r.json().then((err) =>
          setUser({ data: null, error: err.error, status: "rejected" })
        );
      }
    });
  }, [id]);

  /* */
  function handleAddDisplayType(newType) {
    setUser({
      error,
      status,
      data: {
        ...user,
        types: [...user.types, newType],
      },
    });
  }
  /* */

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{user.name}'s Completed Todos</h2>
      <ul>
        {user.types.map((type) => (
          <li key={type.id}>
            {type.type_name} | Type Number: {type.public_id}
          </li>
        ))}
      </ul>
      <hr />
      <UserShowTodoAdd onAddDisplayType={handleAddDisplayType} userId={user.id} />
    </div>
  );
}

export default UserShow;
