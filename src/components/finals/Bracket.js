import React, { Component } from 'react';

class Bracket extends Component {

  render() {
    const { col, row, side, vert, leaf } = this.props
    return (
      <div className={"g-col-" + col + " g-row-" + row}>
        <div className={"bracket " + side}>
          {(side==="left" && !leaf) ? (<div className={"connect"}></div>) : null}
          {side==="right" ? (<div className={"edge " + side + " " + vert}></div>) : null}
          {side==="right" ? (<div className={"connect " + side}></div>) : null}
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
          {side==="left" ? (<div className={"connect " + side}></div>) : null}
          {side==="left" ? (<div className={"edge " + side + " " + vert}></div>) : null}
          {(side==="right" && !leaf) ? (<div className={"connect"}></div>) : null}
        </div>
      </div>
    )
  }
}

export default Bracket
