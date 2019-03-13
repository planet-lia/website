import React, { Component } from 'react';

import api from '../../utils/api';
import liaLogo from '../finals/logotip_border_white256.png';
import OverlayTrigger from "react-bootstrap/es/OverlayTrigger";
import Tooltip from "react-bootstrap/es/Tooltip";
import Row from "react-bootstrap/es/Row";
import Col from "react-bootstrap/es/Col";
import Button from "react-bootstrap/es/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";

class BattlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      battleId: null,
      player1Username: null,
      player2Username: null,
      player1Id: null,
      player2Id: null,
      player1Organization: null,
      player2Organization: null,
      player1Level: null,
      player2Level: null,
      matches: null,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadData(this.props.match.params.battleId);
  }

  loadData = async (battleId) => {
    try {
      // Load battle
      const respBattles = await api.game.getBattle(battleId);
      this.setState({
        battleId: respBattles.battle.battleId,
        player1Username: respBattles.battle.player1.username,
        player2Username: respBattles.battle.player2.username,
        player1Id: respBattles.battle.player1.userId,
        player2Id: respBattles.battle.player2.userId,
        matches: respBattles.battle.matches
      });

      // Load players
      const player1Data = await api.game.getUserPublic(this.state.player1Id);
      const player2Data = await api.game.getUserPublic(this.state.player2Id);
      this.setState({
        player1Organization: player1Data.user.organization,
        player2Organization: player2Data.user.organization,
        player1Level: player1Data.user.level,
        player2Level: player2Data.user.level,
      })

    } catch(err) {
      this.setState({error: "Network Error"});
      console.log(err.message);
    }
  }

  render() {
    const { battleId, player1Username, player2Username, player1Id, player2Id,
      player1Organization, player2Organization, player1Level, player2Level } = this.state;


    const tooltip1 = (
      <Tooltip id={"tooltip-bracket-1-" + {battleId}} className="custom-tooltip">
        <div>{player1Organization} ({player1Level})</div>
      </Tooltip>
    );

    const tooltip2 = (
      <Tooltip id={"tooltip-bracket-2-" + {battleId}} className="custom-tooltip">
        <div>{player2Organization} ({player2Level})</div>
      </Tooltip>
    );

    return (
      <div>
        <div className="container">
          <div id="bracket-title">
            <img id="logo-lia" src={ liaLogo } alt="Lia" />
            <h2>Slovenian Lia Tournament 2019</h2>
            <h2>Finals</h2>
          </div>
        </div>
        <div id="battle-round-title">
          {this.getRoundTitle()}
        </div>
        <Row>
          <Col sm={3}/>
          <Col sm={6}>
            <Row className="text-center">
              <Col sm={5}>
                <div className="player-field player1 text-left">
                  <div>
                    { player1Username
                      ? (
                        <OverlayTrigger placement="bottom" overlay={tooltip1}>
                          <a href={"/user/" + player1Username} target="_blank" rel="noopener noreferrer">
                            {player1Username}
                          </a>
                        </OverlayTrigger>
                      )
                      : (
                        "- - -"
                      )
                    }
                  </div>
                  <div>
                    {this.getNumberOfWins(player1Id)}
                  </div>
                </div>
              </Col>
              <Col sm={2}>
                <div className="battle-text">v.s.</div>
              </Col>
              <Col sm={5}>
                <div className="player-field player2 text-left">
                  <div>
                    { player2Username
                      ? (
                        <OverlayTrigger placement="bottom" overlay={tooltip2}>
                          <a href={"/user/" + player2Username} target="_blank" rel="noopener noreferrer">
                            {player2Username}
                          </a>
                        </OverlayTrigger>
                      )
                      : (
                        "- - -"
                      )
                    }
                  </div>
                  <div>
                    {this.getNumberOfWins(player2Id)}
                  </div>
                </div>
              </Col>
            </Row>

            <Row className={"battle-watch-buttons"}>
              <Col sm={1}/>
              <Col sm={2}>{this.getMatchRender(0)}</Col>
              <Col sm={2}>{this.getMatchRender(1)}</Col>
              <Col sm={2}>{this.getMatchRender(2)}</Col>
              <Col sm={2}>{this.getMatchRender(3)}</Col>
              <Col sm={2}>{this.getMatchRender(4)}</Col>
              <Col sm={1}/>
            </Row>
          </Col>
          <Col sm={3}/>
        </Row>
        <Row>
          <div id="back-to-bracket">
            <Button bsClass="btn custom-btn custom-btn-lg" href="/events/slt2019">Back to bracket</Button>
          </div>
        </Row>
      </div>
    );
  }

  getNumberOfWins = (playerId) => {
    if (this.state.matches == null) return 0;

    let count = 0;
    for (let i in this.state.matches) {
      if (this.state.matches[i].winnerUserId === playerId) count++;
    }
    return count;
  }

  getMatchRender = (matchIndex) => {
    if (this.state.matches == null) return "";

    let match = this.state.matches[matchIndex];

    let className = (match.winnerUserId === this.state.player1Id) ? "user1-color" : "user2-color";

    return <div className="battle-text text-center">
        <div className={className}>
          <b>Game {matchIndex + 1}</b>
          </div>
        <Button
          className="btn btn-watch"
          href={"/games/" + match.matchId} target="_blank" rel="noopener noreferrer"
        >
          <span><FontAwesomeIcon icon="tv" /></span>
          <span> Watch</span>
        </Button>
      </div>
  }


  getRoundTitle = () => {
    const battleId = this.state.battleId;

    if (battleId == null) return "";
    else if (battleId <= 8) return "Eighth-finals";
    else if (battleId <= 12) return "Quarterfinals";
    else if (battleId <= 14) return "Semifinals";
    else if (battleId === 15) return "Third place";
    else if (battleId === 16) return "Final";
  }
}

export default BattlePage
