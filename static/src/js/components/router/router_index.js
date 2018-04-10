import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tournament from '../tournament/tournament_index';
import Header from '../header/header_index';
import Tournaments from '../tournaments/tournaments_index';
import Wizard2 from '../wizard/wizard2';
const AppRouter = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Tournaments} />
<<<<<<< origin/master
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/tournament/:id" component={Tournament} />
=======
      <Route path="/tournaments" component={Tournaments} />
      <Route path="/tournament/:id" component={Tournament} />
        <Route path="/wizard" component={Wizard2} />
>>>>>>> HEAD~2
    </div>
  </Router>
);

export default AppRouter;
