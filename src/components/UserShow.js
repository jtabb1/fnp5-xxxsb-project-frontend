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

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error}</h2>;

  return (
    <div>
      <h2>{user.user_name}'s Completed Todos</h2>
      <ul>
        {user.todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo_name}
          </li>
        ))}
      </ul>
      <hr />
      <UserShowTodoAdd onAddDisplayTodo={handleAddDisplayTodo} userId={user.id} />
    </div>
  );
}

export default UserShow;