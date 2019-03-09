import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

class Bracket extends Component {

  render() {
    const { col, row, side, vert, type, battleId } = this.props
    let edgeIn = null;
    let edgeOut = null;
    let edgeLeft = null;
    let edgeRight = null;

    if(type==="normal"){
      edgeIn = (
        <div className="edge-in">
          <div className={"top " + side}></div>
          <div className={"battle-id " + side}>{battleId}</div>
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
          <div className={"battle-id " + side}>{battleId}</div>
        </div>
      )
      edgeOut = (
        <div className="edge-out">
          <div className={"connect " + side}></div>
          <div className={"edge " + vert + " " + side}></div>
        </div>
      );
    } else if(type==="root"){
      edgeLeft = (
        <div className="root-edge">
          <div className="edge left"></div>
          <div className={"battle-id " + side}>{battleId}</div>
        </div>
      )

      edgeRight = (
        <div className="root-edge">
          <div className="edge right"></div>
        </div>
      )
    } else if(type==="outside") {
      edgeLeft = <div className="root-edge"><div className={"battle-id " + side}>{battleId}</div></div>

      edgeRight = <div className="root-edge"></div>
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
            <div className="player-field player1">
              <div>
                Player1
              </div>
              <div>
                1
              </div>
            </div>
            <div className="battle-indicators">
              <div className="btn-game green"></div>
              <div className="btn-game green"></div>
              <div className="btn-game green"></div>
              <div className="btn-game yellow"></div>
              <div className="btn-game"></div>
            </div>
            <div className="player-field player2">
              <div>
                Player2
              </div>
              <div>
                3
              </div>
            </div>
          </div>
          {edgeRight}
        </div>
      </div>
    )
  }
}

export default Bracket
