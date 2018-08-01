import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import GamesList from '../views/GamesList';
import GameReplay from '../views/GameReplay';

class GamesPage extends Component {

  render(){
    return (
      <div className="container">
        <Switch>
          <Route exact path='/games' component={GamesList} />
          <Route path='/games/:number' component={GameReplay} />
        </Switch>
      </div>
    )
  }

}

export default GamesPage;
