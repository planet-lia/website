import React, { Component } from 'react';

import Bracket from './Bracket'

import './styleBrackets.css'

class BracketsPage extends Component {

  render() {
    return (
      <div className="cont-brackets">
        <Bracket col="1" row="1"  side="left"   type="leaf"   vert="top" />
        <Bracket col="1" row="2"  side="left"   type="leaf"   vert="bottom" />
        <Bracket col="1" row="3"  side="left"   type="leaf"   vert="top" />
        <Bracket col="1" row="4"  side="left"   type="leaf"   vert="bottom" />
        <Bracket col="2" row="12" side="left"   type="normal" vert="top" />
        <Bracket col="2" row="34" side="left"   type="normal" vert="bottom" />
        <Bracket col="3" row="23" side="left"   type="normal" vert="bottom-mid" />
        <Bracket col="4" row="23" side="center" type="root" />
        <Bracket col="4" row="4"  side="center" type="outside" />
        <Bracket col="5" row="23" side="right"  type="normal" vert="top-mid" />
        <Bracket col="6" row="12" side="right"  type="normal" vert="top" />
        <Bracket col="6" row="34" side="right"  type="normal" vert="bottom" />
        <Bracket col="7" row="1"  side="right"  type="leaf"   vert="top" />
        <Bracket col="7" row="2"  side="right"  type="leaf"   vert="bottom" />
        <Bracket col="7" row="3"  side="right"  type="leaf"   vert="top" />
        <Bracket col="7" row="4"  side="right"  type="leaf"   vert="bottom" />
      </div>
    )
  }
}

export default BracketsPage
