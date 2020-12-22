import Home from "./pages/Home";
import LocateUrl from "./pages/LocateUrl";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/:code" component={LocateUrl} />
      </Switch>
    </Router>
  );
}

export default App;
