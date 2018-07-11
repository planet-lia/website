import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';
import HowToPage from '../pages/HowToPage';
import Replay from '../views/Replay';

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={LeaderboardPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/how-to" component={HowToPage} />
        <Route path="/replay" component={Replay} />
      </Switch>
    </div>
  );
}

export default Routes;
