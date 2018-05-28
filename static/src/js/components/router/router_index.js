import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tournament from '../tournament/tournament_index';
import Header from '../header/header_index';
import Tournaments from '../tournaments/tournaments_index';
import CoachPage from '../coach/index';
import CoachHeader from '../coach/header/header';
import LogIn from '../login/login_index';

const AppRouter = () => (
  <Router>
    <div>
      {localStorage.user_type === 'coach' ? <CoachHeader /> : <Header />}
      <Route exact path="/" component={Tournaments} />
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/tournament/:id" component={Tournament} />
      <Route exact path="/coach" component={CoachPage} />
         <Route exact path="/login" component={LogIn} />
    </div>
  </Router>
);

export default AppRouter;
