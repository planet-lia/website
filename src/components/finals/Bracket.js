import React, { Component } from 'react';

class Bracket extends Component {

  render() {
    const { col, row, side, vert, type } = this.props
    let edgeIn = null;
    let edgeOut = null;
    let edgeLeft = null;
    let edgeRight = null;

    if(type==="normal"){
      edgeIn = (
        <div className="edge-in">
          <div className={"top " + side}></div>
          <div className={"bottom " + side}></div>
        </div>
      );
      edgeOut = (
        <div className="edge-out">
          <div className={"connect " + side}></div>
          <div className={"edge " + vert + " " + side}></div>
        </div>
      );
    } else if(type==="leaf"){
      edgeIn = (
        <div className="edge-in">
          &nbsp;
        </div>
      )
      edgeOut = (
        <div className="edge-out">
          <div className={"connect " + side}></div>
          <div className={"edge " + vert + " " + side}></div>
        </div>
      );
    } else if(type==="root"){
      edgeLeft = <div className="root-left"></div>

      edgeRight = <div className="root-right"></div>
    }

    if(side==="left") {
      edgeLeft = edgeIn;
      edgeRight = edgeOut;
    } else if (side==="right") {
      edgeLeft = edgeOut;
      edgeRight = edgeIn;
    }

    return (
      <div className={"g-col-" + col + " g-row-" + row}>
        <div className={"bracket " + side}>
          {edgeLeft}
          <div className="vertex">
            <div className="player-field">
              Player 1
            </div>
            <div>
              - - -
            </div>
            <div className="player-field">
              XXXXXXXXXXXXXXXXXX
            </div>
          </div>
          {edgeRight}
        </div>
      </div>
    )
  }
}

export default Bracket
