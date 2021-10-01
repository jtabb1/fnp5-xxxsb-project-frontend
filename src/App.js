import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
// import HomePage from "./components/HomePage";
import UserShow from "./components/UserShow";
// import TodoShow from "./components/TodoShow";
import UserContainer from "./components/UserContainer";
import TypeContainer from "./components/TypeContainer";

function App() {

  return (
      <div className="app-container">

        <NavBar />

        <Switch>
          <Route exact path="/">
            <UserContainer />
          </Route>

          <Route exact path="/users">
            <UserContainer />
          </Route>

          <Route exact path="/users/:id">
            <UserShow />
          </Route>
{/*
          <Route exact path="/todos/:id">
            <TodoShow />
          </Route>
 */}
          <Route exact path="/types">
            <TypeContainer />
          </Route>

          {/* <Route exact path="/todos">
            <zzTodoContainer />
          </Route> */}
        </Switch>

      </div>
  );
}

export default App;
