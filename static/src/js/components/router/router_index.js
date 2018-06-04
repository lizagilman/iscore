import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tournament from '../tournament/tournament_index';
import Ranking from '../ranking/ranking_index';
import Header from '../header/header_index';
import Tournaments from '../tournaments/tournaments_index';
import Rankings from '../rankings/rankings_index';
import CoachPage from '../coach/index';
import CoachHeader from '../coach/header/header';
import LogIn from '../login/login_index';
import Match from '../umpire/umpire_index';
import UmpireMatches from '../umpire/umpire_matches';
import UmpireTournaments from '../umpire/umpire_tournaments';

const AppRouter = () => (
  <Router>
    <div>
      {localStorage.user_type === 'coach' ? <CoachHeader /> : <Header />}
       <Route exact path="/umpire" component={UmpireTournaments}/>
        <Route exact path="/umpire/tournament/:id/matches" component={UmpireMatches}/>
      <Route exact path="/umpire/match/:id" component={Match}/>
      <Route exact path="/" component={Tournaments} />
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/rankings" component={Rankings} />
      <Route exact path="/tournament/:id" component={Tournament} />
      <Route exact path="/ranking/:id" component={Ranking} />
      <Route exact path="/coach" component={CoachPage} />
      <Route exact path="/login" component={LogIn} />
    </div>
  </Router>
);

export default AppRouter;
