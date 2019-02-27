import React, { Component } from 'react';

import Bracket from './Bracket'

import './styleBrackets.css'

class BracketsPage extends Component {

  render() {
    return (
      <div className="cont-brackets">
        <Bracket col="1" row="1" side={"left"} vert={"top"} leaf={true}/>
        <Bracket col="1" row="2" side={"left"} vert={"bottom"} leaf={true}/>
        <Bracket col="1" row="3" side={"left"} vert={"top"} leaf={true}/>
        <Bracket col="1" row="4" side={"left"} vert={"bottom"} leaf={true}/>
        <Bracket col="2" row="12" side={"left"} vert={"top"}/>
        <Bracket col="2" row="34" side={"left"} vert={"bottom"}/>
        <Bracket col="3" row="23" side={"left"} vert={"top"}/>
        <Bracket col="4" row="23" side={"center"}/>
        <Bracket col="4" row="4" side={"center"}/>
        <Bracket col="5" row="23" side={"right"} vert={"bottom"}/>
        <Bracket col="6" row="12" side={"right"} vert={"top"}/>
        <Bracket col="6" row="34" side={"right"} vert={"bottom"}/>
        <Bracket col="7" row="1" side={"right"} vert={"top"} leaf={true}/>
        <Bracket col="7" row="2" side={"right"} vert={"bottom"} leaf={true}/>
        <Bracket col="7" row="3" side={"right"} vert={"top"} leaf={true}/>
        <Bracket col="7" row="4" side={"right"} vert={"bottom"} leaf={true}/>
      </div>
    )
  }
}

export default BracketsPage
