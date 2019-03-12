import React, { Component } from 'react';

import api from '../../utils/api';

class BattlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battle: null,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadBattle(this.props.match.params.battleId)
  }

  loadBattle = async (battleId) => {
    try {
      const respBattles = await api.game.getBattle(battleId);
      this.setState({battle: respBattles.battle});
    } catch(err) {
      this.setState({error: "Network Error"});
      console.log(err.message);
    }
  }

  render() {
    const { battle } = this.state;
    console.log(this.state.battle)
    return (
      <div>
        {battle ? battle.battleId : "Hello"}
      </div>
    );
  }

}

export default BattlePage
