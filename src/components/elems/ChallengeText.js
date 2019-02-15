import React, { Component } from 'react';

import { miscConst } from '../../utils/constants/miscConst';
import { timeTo } from '../../utils/helpers/time';

import api from '../../utils/api';

import { connect } from 'react-redux';

class ChallengeText extends Component {
  constructor(props){
    super(props);
    this.state = {
      cLeft: 0,
      cTotal: 0,
      cResetIn: 0,
      isReady: false,
      error: null,
    }
  }

  componentDidMount = () => {
    if(this.props.isAuthenticated){
      this.loadChallengeStats();
    }
  }

  loadChallengeStats = async () => {
    const { ready, setNotReady } = this.props;
    setNotReady();
    try {
      const respStats = await api.game.getChallengesStats();
      this.setState({
        cLeft: respStats.challenges.today,
        cTotal: respStats.challenges.total,
        cResetIn: respStats.challenges.reset,
        isReady: true
      });
      ready(true, respStats.challenges.today);
    } catch(err) {
      this.setState({
        error: "Network Error",
        isReady: true
      });
      console.log(err.message);
      ready(false);
    }
  }

  popupMsgText = () => {
    const { cTotal, cResetIn, isReady } = this.state;
    let cLeft = this.state.cLeft;
    let res = [];

    if(this.props.isSent){
      cLeft--;
    }
    
    if(isReady) {
      if(cLeft<1){
        res.push(<p key="0">{"You already spent all of your challenges for today. You have to wait " + timeTo(new Date(cResetIn)) + " to start new challenges."}</p>);
        if(cTotal<miscConst.MAX_NUM_CHALLENGES){
          res.push(<p key="1">Invite friends to unlock more daily challenges.</p>);
        }
        return res;
      }
    }
  }

  render() {
    const { opponent, isSent } = this.props;
    const { cLeft } = this.state;
    return (
      <div>
        <p>{"You want to challenge: "}<span className="challenge-data">{opponent}</span></p>
        <p>{"Challenges left for today: "}
          <span className="challenge-data">
            {isSent
              ? cLeft-1
              : cLeft
            }
          </span>
        </p>
        <div>{this.popupMsgText()}</div>
      </div>
    )
  }

}

function mapStateToProps(state) {
    const { isAuthenticated } = state.authentication;
    const { opponent, opponentId } = state.popups;
    return {
        isAuthenticated,
        opponent,
        opponentId
    };
}

export default connect(mapStateToProps)(ChallengeText);
