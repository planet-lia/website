import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import LoadingButton from '../elems/LoadingButton';
import ChallengeText from '../elems/ChallengeText';

import api from '../../utils/api';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

class PopupChallenge extends Component {
  constructor(props){
    super(props);
    this.state = {
      cLeft: 0,
      isSent: false,
      textIsReady: false,
      loadingData: false,
      error: null
    };
  }

  postChallenge = async () => {
    this.setState({loadingData: true});
    try {
      await api.game.challengeUser(this.props.opponentId);
      this.setState({
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

  popupChallengeButton = () => {
    const { cLeft, loadingData, isSent, textIsReady } = this.state;
    if(loadingData || !textIsReady){
      return <LoadingButton bsClass="btn custom-btn custom-btn-lg">Send Challenge</LoadingButton>
    } else if(isSent){
      return <Button bsClass="btn custom-btn custom-btn-lg" onClick={this.props.onHide}>Ok</Button>
    } else if(cLeft>0){
      return <Button bsClass="btn custom-btn custom-btn-lg" onClick={this.postChallenge}>Send Challenge</Button>
    } else {
      return <Button bsClass="btn custom-btn custom-btn-lg" disabled>Send Challenge</Button>
    }
  }

  handleReady = (isReady, success = false, data = null) => {
    if(isReady){
      if(success){
        this.setState({
          cLeft: data,
          textIsReady: true,
          error: null
        })
      } else {
        this.setState({
          textIsReady: true,
          error: "Network Error"
        })
      }
    } else {
      this.setState({
        textIsReady: false,
        error: null
      })
    }
  }

  render() {
    const { show, onHide, isAuthenticated, dispatch } = this.props;
    const { isSent, error } = this.state;
    if(isAuthenticated){
      return(
        <Modal dialogClassName="custom-popup pop-challenge pop-text" show={show} onHide={onHide}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>Challenge</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ChallengeText isSent={isSent} ready={(success, data) => this.handleReady( true, success, data)} setNotReady={() => this.handleReady(false)} />
            {isSent
              ? <p className="text-info">The challenge was sent! The result will be visible on your profile shortly.</p>
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
            <Modal.Title>Challenge</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>You need to be signed in to send a challenge! If you do not have an account yet, you need to sign up and upload a bot.</p>
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={() => dispatch(popupsActions.showSignIn())}>Sign In</Button>
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={() => dispatch(popupsActions.showRegistration())}>Sign Up</Button>
            </div>
          </Modal.Footer>
        </Modal>
      )
    }

  }

}

function mapStateToProps(state) {
    const { isAuthenticated } = state.authentication;
    const { opponentId } = state.popups;
    return {
        isAuthenticated,
        opponentId
    };
}

export default connect(mapStateToProps)(PopupChallenge);
