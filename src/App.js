import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import EmployeeShow from "./components/EmployeeShow";
import EmployeeContainer from "./components/EmployeeContainer";
import TaskContainer from "./components/TaskContainer";
import TrainingContainer from "./components/TrainingContainer";

function App() {

  return (
      <div className="app-container">

        <NavBar />

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/employees">
            <EmployeeContainer />
          </Route>

          <Route exact path="/employees/:id">
            <EmployeeShow />
          </Route>

          <Route exact path="/tasks">
            <TaskContainer />
          </Route>

          <Route exact path="/trainings">
            <TrainingContainer />
          </Route>
        </Switch>

      </div>
  );
}

export default App;
