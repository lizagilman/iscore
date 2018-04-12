import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tournament from '../tournament/tournament_index';
import Header from '../header/header_index';
import Tournaments from '../tournaments/tournaments_index';

const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Tournaments} />
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/tournament/:id" component={Tournament} />
    </div>
  </Router>
);

export default AppRouter;
