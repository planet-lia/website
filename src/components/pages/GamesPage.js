import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GamesList from '../views/GamesList';
import GameReplay from '../views/GameReplay';

class GamesPage extends Component {

  render(){
    return (
      <Switch>
        <Route exact path='/games' component={GamesList} />
        <Route path='/games/:number' component={GameReplay} />
      </Switch>
    )
  }

}

export default GamesPage;
