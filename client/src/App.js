import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import NotFound from "./sharedComponents/NotFound";
import Posts from "./layouts/Posts/Posts";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
