import React, { Component } from 'react';

class Replay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 1,
      replay: null
    }

  }

  componentDidMount = () => {
    this.checkAndRun()
  }

  componentWillUnmount = () => {
    window.liaGame.destroyReplay(this.state.replay);
  }

  checkAndRun = () => {
    if(window.liaGame){
      this.setState({
        replay: window.liaGame.playReplay(
          "gameView",
          "/assets/",
          "/assets/replays/replay_" + this.props.number + ".lia",
          "timeSpinner",
          "speedSpinner",
          ["camera1", "camera2", "camera3"]
        )
      });
    } else {
      setTimeout(this.checkAndRun, 100);
    }
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
            <div className="col-sm-6">
              <input type="range" min="0" max="0" step="0.01" id="timeSpinner" className="slider" />
            </div>
            <div className="col-sm-1 cameras">
                <button type="button" id="camera1">c1</button>
                <button type="button" id="camera2">c2</button>
                <button type="button" id="camera3">c3</button>
            </div>
        </div>
        <div className="row">
          <div id="gameView"></div>
        </div>
    </div>
    )
  }

}

export default Replay;
