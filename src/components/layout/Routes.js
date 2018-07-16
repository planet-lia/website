import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';
import HowToPage from '../pages/HowToPage';

const Routes = () => {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={LeaderboardPage} />
        <Route path="/games" component={GamesPage} />
        <Route path="/how-to" component={HowToPage} />
      </Switch>
    </div>
  );
}

export default Routes;
