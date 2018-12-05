import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LandingPage from '../pages/LandingPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';
import EditorPage from "../pages/EditorPage";
import EditorTracking from "../pages/EditorTracking";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/games" component={GamesPage} />
        <Route path="/editor" component={EditorPage} />
      <Route path="/editor/tracking" component={EditorTracking} />
    </Switch>
  );
}

export default Routes;
