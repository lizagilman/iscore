
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../home/home_index";
import Wizard from "../wizard/wizard";


const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" component={Home} />
      <Route path="/wizard" component={Wizard} />
      {/*
            <Route path="/some-url" component={component1} />
            <Route path="/url-with-param/:param" component={component2} />
            */}
    </div>
  </Router>
);

export default AppRouter;
