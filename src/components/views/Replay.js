import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import { Glyphicon } from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';

class Replay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replay: null,
      duration: 0,
      time: 0,
      isFull: false,
      speed: 1
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
          ["camera1", "camera2", "camera3"],
          this.setGameDuration,
          this.setTime
        )
      });
    } else {
      setTimeout(this.checkAndRun, 100);
    }
  }

  setGameDuration = (duration) => {
    this.setState({duration: duration});
  }

  setTime = (time) => {
    this.setState({time: time});
  }

  goFull = () => {
    if(this.state.isFull===true){
      this.setState({ isFull: false });
    } else {
      this.setState({ isFull: true });
    }

  }

  onChangeTime = (event) => {
    this.state.replay.changeTime(event.target.value);
    this.setState({
      time: event.target.value,
    });
  }

  onSpeedChange = (event) => {
    this.state.replay.changeSpeed(event.target.value);
    this.setState({speed: event.target.value});
  }

  render() {
    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({isFull})}
      >
        <div className="cont-player">
          <div className="row-replay">
              <div id="gameView"></div>
          </div>
          <div className="row-pui">
            <div className="pui-timeline">
              <ReactBootstrapSlider value={this.state.time} min={0} max={this.state.duration} step={0.01} change={this.onChangeTime} />
            </div>
            <div className="pui-buttons">
              <div className="pui-btns-left">
                <button>
                  <Glyphicon glyph="play" />
                </button>
                <button>
                  <span className="btn-move-text-up">{this.state.speed + "x"}</span>
                </button>
                <div>
                  <ReactBootstrapSlider value={this.state.speed} min={-6} max={6} step={0.1} change={this.onSpeedChange} tooltip="hide" />
                </div>
              </div>
              <div className="pui-btns-right">
                <div className="cameras hidden">
                  <button type="button" id="camera1">c1</button>
                  <button type="button" id="camera2">c2</button>
                  <button type="button" id="camera3">c3</button>
                </div>
                <button>
                  <Glyphicon glyph="facetime-video" />
                  <span className="pui-move-text-up"> 1</span>
                </button>
                <button onClick={this.goFull}>
                  {this.state.isFull ? <Glyphicon glyph="fullscreen" /> : <Glyphicon glyph="fullscreen" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fullscreen>
    )
  }

}

export default Replay;
