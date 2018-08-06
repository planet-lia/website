import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';

const Routes = (props) => {
  return (
    <Switch>
      <Route exact path="/" render={() => <LandingPage {...props}/>} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/games" component={GamesPage} />
    </Switch>
  );
}

export default Routes;
