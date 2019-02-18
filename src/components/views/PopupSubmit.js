import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';

import SignInForm from '../forms/SignInForm';
import SignUpForm from '../forms/SignUpForm';

class PopupSubmit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formSubmitButtonId: "btn-submit-" + this.props.formType,
      newHeading: "",
      newButtonText: "",
      disableButton: false,
    }
  }

  getForm = () => {
    if(this.props.formType==="sign-in"){
      return (
        <SignInForm
          submitButtonId={this.state.formSubmitButtonId}
          closePopup={this.props.onHide}
          setHeading={() => this.setState({newHeading: "Forgot Password"})}
          setButtonText={() => this.setState({newButtonText: "Send"})}
          disableButton={() => this.setState({disableButton: true})}
        />
      );
    } else if (this.props.formType==="sign-up"){
      return <SignUpForm submitButtonId={this.state.formSubmitButtonId} closePopup={this.props.onHide}/>
    }
  }


  render(){
    const { formSubmitButtonId, newHeading, newButtonText, disableButton } = this.state;
    const { dialogClassName, show, onHide, heading, buttonText } = this.props;

    return(
      <Modal dialogClassName={dialogClassName} show={show} onHide={onHide}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title>{newHeading ? newHeading : heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.getForm()}
        </Modal.Body>
        <Modal.Footer>
          <label className="btn custom-btn custom-btn-lg" htmlFor={formSubmitButtonId} disabled={disableButton}>{newButtonText ? newButtonText : buttonText}</label>
        </Modal.Footer>
      </Modal>
    )
  }

}

export default PopupSubmit;
