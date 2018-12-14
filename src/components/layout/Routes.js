import React from 'react';
import { Switch, Route } from 'react-router-dom';

//import PrivateRoute from './PrivateRoute';
import LandingPage from '../pages/LandingPage';
import LeaderboardPage from '../pages/LeaderboardPage';
import GamesPage from '../pages/GamesPage';
import EditorPage from "../pages/EditorPage";
import EditorTracking from "../pages/EditorTracking";
import EmailVerificationPage from '../pages/EmailVerificationPage';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route path="/leaderboard" component={LeaderboardPage} />
      <Route path="/games" component={GamesPage} />
      <Route path="/editor/tracking" component={EditorTracking} />
      <Route path="/editor" component={EditorPage} />
      <Route path="/account/verify" component={EmailVerificationPage} />
    </Switch>
  );
}

export default Routes;
