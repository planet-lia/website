import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

import GamesList from '../views/GamesList';
import GameReplay from '../views/GameReplay';

class GamesPage extends Component {

  render(){
    return (
      <div>
        <div className="custom-notification margin-bottom20">
          <div className="container text-center">
            <div className="margin-bottom8">Game page is currently in use for <Link to="/tournament">Slovenian Lia tournament 2019</Link>.</div>
            <div>Get your tickets for the finals of Slovenian Lia Tournament 2019, check <a href="https://www.facebook.com/events/2543198445721481/" target="_blank" rel="noopener noreferrer">the event details</a>.</div>
          </div>
        </div>
        <div className="container">
          <Switch>
            <Route exact path='/games' component={GamesList} />
            <Route path='/games/:number' component={GameReplay} />
          </Switch>
        </div>
      </div>
    )
  }

}

export default GamesPage;
