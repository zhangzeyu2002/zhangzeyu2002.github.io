import { Route, Switch } from "wouter";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route component={Home} />
    </Switch>
  );
}

function App() {
  return <Router />;
}

export default App;
