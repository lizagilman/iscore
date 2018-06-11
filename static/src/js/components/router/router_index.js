import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Tournament from '../tournament/tournament_index';
import Ranking from '../ranking/ranking_index';
import Tournaments from '../tournaments/tournaments_index';
import Rankings from '../rankings/rankings_index';
import CoachPage from '../coach/index';
import LogIn from '../login/login_index';
import Match from '../umpire/umpire_index';
import UmpireMatches from '../umpire/umpire_matches';
import UmpireTournaments from '../umpire/umpire_tournaments';
import Header from '../header/header_index';



const AppRouter = () => (
  <BrowserRouter>
    <div>

      <Header/>

      <Route exact path="/umpire/tournaments" component={UmpireTournaments} />
      <Route
        exact
        path="/umpire/tournament/:id/matches"
        component={UmpireMatches}
      />
      <Route exact path="/umpire/match/:id" component={Match} />
      <Route exact path="/" component={LogIn} />
      <Route exact path="/umpire" component={UmpireTournaments} />
      <Route exact path="/tournaments" component={Tournaments} />
      <Route exact path="/rankings" component={Rankings} />
      <Route exact path="/tournament/:id" component={Tournament} />
      <Route exact path="/ranking/:id" component={Ranking} />
      <Route exact path="/coach" component={CoachPage} />
    </div>
  </BrowserRouter>
);

export default AppRouter;
