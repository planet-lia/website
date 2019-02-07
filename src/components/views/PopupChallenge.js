import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import LoadingButton from '../elems/LoadingButton';
import { miscConst } from '../../utils/constants/miscConst';

import api from '../../utils/api';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

class PopupChallenge extends Component {
  constructor(props){
    super(props);
    this.state = {
      cLeft: 0,
      cTotal: 0,
      isSent: false,
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

  postChallenge = async () => {
    this.setState({loadingData: true});
    try {
      await api.game.challengeUser(this.props.opponentId);
      this.setState({
        cLeft: this.state.cLeft-1,
        isSent: true,
        loadingData: false,
        error: null
      });
    } catch(err) {
      if(err.response){
        this.setState({
          loadingData: false,
          error: err.response.data.error
        });
      } else {
        this.setState({
          loadingData: false,
          error: "Network Error"
        });
        console.log(err.message);
      }
    }
  }

  showSignPopup = async (mode) => {
    if(mode===0){
      await this.props.dispatch(popupsActions.showSignIn());
    } else if(mode===1) {
      await this.props.dispatch(popupsActions.showRegistration());
    }
  }

  popupMsgText = () => {
    const { cLeft, cTotal } = this.state;
    let txt = [];

    if(cLeft<1){
      txt.push(<span key="0">You already spent all of your challenges for today. You have to wait until tomorrow to start new challenges</span>);
      if(cTotal<miscConst.MAX_NUM_CHALLENGES){
        txt.push(<span key="1"> or invite friends to get more daily challenges.</span>);
      } else {
        txt.push(<span key="2">.</span>)
      }
      return txt;
    }
  }

  popupChallengeButton = () => {
    const { cLeft, loadingData, isSent } = this.state;
    if(loadingData){
      return <LoadingButton bsClass="btn custom-btn custom-btn-lg">Send Challenge</LoadingButton>
    } else if(isSent){
      return <Button bsClass="btn custom-btn custom-btn-lg" onClick={() => this.props.dispatch(popupsActions.hidePopups())}>Ok</Button>
    } else if(cLeft>0){
      return <Button bsClass="btn custom-btn custom-btn-lg" onClick={this.postChallenge}>Send Challenge</Button>
    } else {
      return <Button bsClass="btn custom-btn custom-btn-lg" disabled>Send Challenge</Button>
    }
  }

  render(){
    const { show, onHide, isAuthenticated, opponent } = this.props;
    const { cLeft, isSent, error } = this.state;
    if(isAuthenticated){
      return(
        <Modal dialogClassName="custom-popup pop-challenge pop-text" show={show} onHide={onHide}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>{"Challenge " + opponent}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You want to challenge:<span className="challenge-data"> {opponent}</span></p>
            <p>Challenges left for today:<span className="challenge-data"> {cLeft}</span></p>
            <p>{this.popupMsgText()}</p>
            {isSent
              ? <p className="text-info">The challenge was sent. You can see it on your profile page.</p>
              : null
            }
            {error!==null
              ? <p className="text-danger">{error}</p>
              : null}
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              {this.popupChallengeButton()}
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
            <p>You need to be signed in to send a challenge! If you do not have an account yet, you need to sign up and upload a bot.</p>
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
    const { opponent, opponentId } = state.popups;
    return {
        isAuthenticated,
        opponent,
        opponentId
    };
}

export default connect(mapStateToProps)(PopupChallenge);
