import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { Glyphicon } from 'react-bootstrap';

import Bracket from './Bracket'

import liaLogo from './logotip_border_white256.png';
import './styleBrackets.css'

class BracketsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFull: false
    }
  }

  goFull = () => {
    let goFullScreen;

    if(this.state.isFull===true){
      goFullScreen = false;
    } else {
      goFullScreen = true;
    }

    this.setState({ isFull: goFullScreen });
  }

  render() {
    return (
      <div id="cont-brackets-page">
        {/*<div onClick={this.goFull} className="text-center">
          <Glyphicon glyph="fullscreen" />
        </div>*/}
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div className="cont-brackets">
            <div id="title">
              <img id="logo-lia" src={ liaLogo } alt="Lia" />
              <h3>Slovenian Lia Tournament 2019</h3>
              <h3>Finals</h3>
            </div>
            <Bracket battleId={1} />
            <Bracket battleId={2} />
            <Bracket battleId={3} />
            <Bracket battleId={4} />
            <Bracket battleId={9} />
            <Bracket battleId={10} />
            <Bracket battleId={13} />
            <Bracket battleId={16} />
            <Bracket battleId={15} />
            <Bracket battleId={14} />
            <Bracket battleId={11} />
            <Bracket battleId={12} />
            <Bracket battleId={5} />
            <Bracket battleId={6} />
            <Bracket battleId={7} />
            <Bracket battleId={8} />
          </div>
        </Fullscreen>
      </div>
    )
  }
}

export default BracketsPage
