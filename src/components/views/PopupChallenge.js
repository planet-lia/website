import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions'

class PopupChallenge extends Component {

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

  render(){
    const { show, onHide, isAuthenticated, opponent } = this.props;
    if(isAuthenticated){
      return(
        <Modal dialogClassName="custom-popup pop-challenge" show={show} onHide={onHide}>
          <Modal.Header className="custom-modal-header" closeButton>
            <Modal.Title>{"Challenge " + opponent}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Challenge text TODO
          </Modal.Body>
          <Modal.Footer>
            <div className="text-center">
              <Button bsClass="btn custom-btn custom-btn-lg" onClick={this.postChallenge}>Challenge</Button>
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
            Can't challenge text TODO
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
