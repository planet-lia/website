import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';

class PopupSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitButtonId: "btn-submit-" + this.props.formType
    }
  }

  getForm = () => {
    if(this.props.formType==="sign-in"){
      return <SignInForm submitButtonId={this.state.formSubmitButtonId} closePopup={this.props.onHide}/>;
    } else if (this.props.formType==="sign-up"){
      return <SignUpForm submitButtonId={this.state.formSubmitButtonId} closePopup={this.props.onHide}/>
    }
  }


  render(){
    return(
      <Modal dialogClassName={this.props.dialogClassName} show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title>{this.props.heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.getForm()}
        </Modal.Body>
        <Modal.Footer>
          <label className="btn custom-btn" htmlFor={this.state.formSubmitButtonId}>{this.props.buttonText}</label>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default PopupSubmit;
