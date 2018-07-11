import React, { Component } from 'react';

class Replay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replayFile: "sd",
      showButtons: true,
      speed: 1
    }

  }
  onPlay = (fileName) => {
    this.setState({
      replayFile: fileName,
      showButtons: false
    });

  }

  onSpeedChange = (event) => {
    this.setState({speed: event.target.value});
  }

  render() {
    return (
      <div>
        <div className="row" style={{paddingTop: "20px"}} id="uiRow">
            <div className="col-sm-1 normal-text">Speed:</div>
            <div className="col-sm-3">
                <input type="range" min="-6" max="6" value={this.state.speed} step="0.1" id="speedSpinner" className="slider" onChange={this.onSpeedChange} />
                <span id="speedValue" className="normal-text">{this.state.speed + "x"}</span>
            </div>
            <div className="col-sm-1 normal-text">Time:</div>
            <div className="col-sm-6" id="timeCol"></div>
            <div className="col-sm-1 cameras">
                <button type="button" id="camera1">c1</button>
                <button type="button" id="camera2">c2</button>
                <button type="button" id="camera3">c3</button>
            </div>
        </div>
        <div className="row">
          {this.state.showButtons ? (
            <div className="col-sm-12" style={{textAlign: "center"}}>
                <button type="button" id="replay1" onClick={() => this.onPlay("replay_1.lia")}>Close one</button>
                <button type="button" id="replay2" onClick={() => this.onPlay("replay_2.lia")}>Dominated</button>
                <button type="button" id="replay3" onClick={() => this.onPlay("replay_3.lia")}>Noob vs pro</button>
                <span hidden id="replayFile">sd</span>
            </div>
          ) : (
            <div className="col-sm-12" style={{textAlign: "center"}}>
                <span hidden id="replayFile">sd</span>
            </div>
          )}
        </div>
        <div className="row">
          <div id="gameView"></div>
        </div>
    </div>
    )
  }

}

export default Replay;
