import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { Glyphicon } from 'react-bootstrap';

import Bracket from './Bracket'

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
      <div>
        <div onClick={this.goFull} className="text-center">
          <Glyphicon glyph="fullscreen" />
        </div>
        <Fullscreen
          enabled={this.state.isFull}
          onChange={isFull => this.setState({isFull})}
        >
          <div className="cont-brackets">
            <Bracket col="1" row="1"  battleId="1" side="left"   type="leaf"   vert="top" />
            <Bracket col="1" row="2"  battleId="2" side="left"   type="leaf"   vert="bottom" />
            <Bracket col="1" row="3"  battleId="3" side="left"   type="leaf"   vert="top" />
            <Bracket col="1" row="4"  battleId="4" side="left"   type="leaf"   vert="bottom" />
            <Bracket col="2" row="12" battleId="9" side="left"   type="normal" vert="top" />
            <Bracket col="2" row="34" battleId="10" side="left"   type="normal" vert="bottom" />
            <Bracket col="3" row="23" battleId="13" side="left"   type="normal" vert="bottom-mid" />
            <Bracket col="4" row="23" battleId="16" side="center" type="root" />
            <Bracket col="4" row="4"  battleId="15" side="center" type="outside" />
            <Bracket col="5" row="23" battleId="14" side="right"  type="normal" vert="top-mid" />
            <Bracket col="6" row="12" battleId="11" side="right"  type="normal" vert="top" />
            <Bracket col="6" row="34" battleId="12" side="right"  type="normal" vert="bottom" />
            <Bracket col="7" row="1"  battleId="5" side="right"  type="leaf"   vert="top" />
            <Bracket col="7" row="2"  battleId="6" side="right"  type="leaf"   vert="bottom" />
            <Bracket col="7" row="3"  battleId="7" side="right"  type="leaf"   vert="top" />
            <Bracket col="7" row="4"  battleId="8" side="right"  type="leaf"   vert="bottom" />
          </div>
        </Fullscreen>
      </div>
    )
  }
}

export default BracketsPage
