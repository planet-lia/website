import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { numAddEndings } from '../../utils/helpers/numAddEndings'

import api from '../../utils/api';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

class PopupChallenge extends Component {
  constructor(props){
    super(props);
    this.state = {
      cLeft: 0,
      cTotal: 0,
      cCount: 0,
      loadingData: false,
      error: null
    };
  }

  componentDidMount = () => {
    if(this.props.isAuthenticated){
      this.loadChallengeStats();
    }
  }

  loadChallengeStats = async () => {
    this.setState({loadingData: true});
    try {
      const respStats = await api.game.getChallengesStats();
      this.setState({
        cLeft: respStats.challenges.today,
        cTotal: respStats.challenges.total,
        cCount: respStats.challenges.total - respStats.challenges.today,
        loadingData: false
      });
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  postChallenge = () => {
    console.log("TODO post challenge");
  }

  showSignPopup = async (mode) => {
    if(mode===0){
      await this.props.dispatch(popupsActions.showSignIn());
    } else if(mode===1) {
      await this.props.dispatch(popupsActions.showRegistration());
    }
  }

  popupStatsText = () => {
    const { cCount, cLeft, cTotal } = this.state;
    let res = [];
    let txt = [];

    if(cLeft>0){
      res.push(<p key="0">This will be your {numAddEndings(cCount+1)} challenge today. After this you will have {cLeft-1} challenges left.</p>);
      res.push(<p key="1">You will be able to see this challenge on your profile page.</p>);
    } else {
      txt.push(<span key="2">You already spent all {cTotal} of your challenges for today. You have to wait until tomorrow to start new challenges</span>);
      if(cTotal<20){
        txt.push(<span key="3"> or invite friends to get more daily challenges.</span>);
      } else {
        txt.push(<span key="4">.</span>)
      }
      res.push(<p key="6">{txt}</p>)
    }
    return res;
  }

  render(){
    const { show, onHide, isAuthenticated, opponent } = this.props;
    const { cLeft } = this.state;
    if(isAuthenticated){
      return(
        <Modal dialogClassName="custom-popup pop-challenge pop-text" show={show} onHide={onHide}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>{"Challenge " + opponent}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You want to challenge:</p>
            <div id="opponent" className="text-center">{opponent}</div>
            {this.popupStatsText()}
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              {cLeft>0
                ? <Button bsClass="btn custom-btn custom-btn-lg" onClick={this.postChallenge}>Challenge</Button>
                : <Button bsClass="btn custom-btn custom-btn-lg" disabled>Challenge</Button>
              }
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={onHide}>Cancel</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    } else {
      return(
        <Modal dialogClassName="custom-popup pop-challenge" show={show} onHide={onHide}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>{"Challenge"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>To challange a player you need to sign up and upload your first bot.</p>
            <p>If you already have an account, you need to sign in.</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={() => this.showSignPopup(0)}>Sign In</Button>
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={() => this.showSignPopup(1)}>Sign Up</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    }

  }

}

function mapStateToProps(state) {
    const { isAuthenticated } = state.authentication;
    const { opponent } = state.popups;
    return {
        isAuthenticated,
        opponent
    };
}

export default connect(mapStateToProps)(PopupChallenge);
