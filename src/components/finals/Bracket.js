import React, { Component } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

class Bracket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      col: null,
      row: null,
      side: null,
      vert: null,
      type: null
    }
  }

  componentDidMount = () => {
    switch(this.props.battleId) {
      case 1:
        this.setState({ col:"1", row:"1", side:"left", type:"leaf", vert:"top" });
        break;
      case 2:
        this.setState({ col:"1", row:"2", side:"left", type:"leaf", vert:"bottom" });
        break;
      case 3:
        this.setState({ col:"1", row:"3", side:"left", type:"leaf", vert:"top" });
        break;
      case 4:
        this.setState({ col:"1", row:"4", side:"left", type:"leaf", vert:"bottom" });
        break;
      case 9:
        this.setState({ col:"2", row:"12", side:"left", type:"normal", vert:"top" });
        break;
      case 10:
        this.setState({ col:"2", row:"34", side:"left", type:"normal", vert:"bottom" });
        break;
      case 13:
        this.setState({ col:"3", row:"23", side:"left", type:"normal", vert:"bottom-mid" });
        break;
      case 16:
        this.setState({ col:"4", row:"23", side:"center", type:"root" });
        break;
      case 15:
        this.setState({ col:"4", row:"34", side:"center", type:"outside" });
        break;
      case 14:
        this.setState({ col:"5", row:"23", side:"right", type:"normal", vert:"top-mid" });
        break;
      case 11:
        this.setState({ col:"6", row:"12", side:"right", type:"normal", vert:"top" });
        break;
      case 12:
        this.setState({ col:"6", row:"34", side:"right", type:"normal", vert:"bottom" });
        break;
      case 5:
        this.setState({ col:"7", row:"1", side:"right", type:"leaf", vert:"top" });
        break;
      case 6:
        this.setState({ col:"7", row:"2", side:"right", type:"leaf", vert:"bottom" });
        break;
      case 7:
        this.setState({ col:"7", row:"3", side:"right", type:"leaf", vert:"top" });
        break;
      case 8:
        this.setState({ col:"7", row:"4", side:"right", type:"leaf", vert:"bottom" });
        break;
      default:
        //do nothing
    }
  }

  setEdges = () => {
    const { side, vert, type } = this.state;
    const { battleId } = this.props;

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

    return {edgeLeft, edgeRight};
  }

  render() {
    const { col, row, side } = this.state;
    const { battleId, player1, player2, org1, org2 } = this.props;
    const { edgeLeft, edgeRight } = this.setEdges();

    const tooltip1 = (
      <Tooltip id={"tooltip-bracket-1-" + battleId} className="custom-tooltip">
        <div>{org1}</div>
      </Tooltip>
    );

    const tooltip2 = (
      <Tooltip id={"tooltip-bracket-2-" + battleId} className="custom-tooltip">
        <div>{org2}</div>
      </Tooltip>
    );

    return (
      <div className={"g-col-" + col + " g-row-" + row}>
        <div className={"bracket " + side}>
          {edgeLeft}
          <div className="vertex">
            <div className="player-field player1">
              <div>
                {player1
                  ? (
                    <OverlayTrigger placement="bottom" overlay={tooltip1}>
                      <a href={"/user/" + player1} target="_blank" rel="noopener noreferrer">
                        {player1}
                      </a>
                    </OverlayTrigger>
                  )
                  : (
                    "- - -"
                  )
                }
              </div>
              <div>
                0
              </div>
            </div>
            <div className="battle-indicators">
              <div className="btn-game"></div>
              <div className="btn-game"></div>
              <div className="btn-game"></div>
              <div className="btn-game"></div>
              <div className="btn-game"></div>
            </div>
            <div className="player-field player2">
              <div>
                {player2
                  ? (
                    <OverlayTrigger placement="bottom" overlay={tooltip2}>
                      <a href={"/user/" + player2} target="_blank" rel="noopener noreferrer">
                        {player2}
                      </a>
                    </OverlayTrigger>
                  )
                  : (
                    "- - -"
                  )
                }
              </div>
              <div>
                0
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
