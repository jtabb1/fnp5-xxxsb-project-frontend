import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import HomePage from "./components/HomePage";
import Login from "../pages/Login";
import UserShow from "./components/UserShow";
import UserContainer from "./components/UserContainer";
import TypeContainer from "./components/TypeContainer";
import Login from "../pages/Login";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
      <div className="app-container">

        <NavBar user={user} setUser={setUser} />

        <Switch>
          <Route exact path="/">
            <UserContainer user={user} />
          </Route>

          <Route exact path="/users">
            <UserContainer user={user} />
          </Route>

          <Route exact path="/users/:id">
            <UserShow user={user} />
          </Route>

          <Route exact path="/types">
            <TypeContainer user={user} />
          </Route>

        </Switch>

      </div>
  );
}

export default App;
