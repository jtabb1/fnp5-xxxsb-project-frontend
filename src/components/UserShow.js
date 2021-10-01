import { useEffect, useState } from "react";
// import { useParams } from "react-router";
import UserShowTodoAdd from "./UserShowTodoAdd";

function UserShow({ id }) {
  const [{ data: user, error, status }, setUser] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  // const { id } = useParams();

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
  function handleAddDisplayTodo(newTodo) {
    setUser({
      error,
      status,
      data: {
        ...user,
        todos: [...user.todos, newTodo],
      },
    });
  }
  /* */

  function handleDelete(id) {
    //
  }

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <hr />
      <UserShowTodoAdd onAddDisplayTodo={handleAddDisplayTodo} userId={user.id} />

      <h2>{user.user_name}'s Todo's</h2>
      <ul>
        {user.todos.map((todo, ix) => (
          <li key={"UserShow_todo" + todo.id + ix}>
            {todo.todo_name} &nbsp;
            <button onClick={handleDelete(todo.id)}>Done</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserShow;
