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
      speed: 1,
      camera: 1,
      isFull: false,
      showSpeedSlider: false,
      showCameras: false
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
              <ReactBootstrapSlider value={this.state.time} min={0} max={this.state.duration} step={0.01} change={this.onChangeTime} tooltip="hide" />
            </div>
            <div className="pui-buttons">
              <div className="pui-btns-left">
                <div className="pui-btn">
                  <Glyphicon className="pui-btns-glyph" glyph="play" />
                </div>
                <div className="pui-cont" onMouseEnter={() => this.setState({showSpeedSlider: true})} onMouseLeave={() => this.setState({showSpeedSlider: false})}>
                  <div className="pui-btn pui-btn-wide">
                    <span>{this.state.speed + "x"}</span>
                  </div>
                  {this.state.showSpeedSlider ? (
                    <div className="pui-btn pui-speed-slider">
                      <ReactBootstrapSlider value={this.state.speed} min={-6} max={6} step={0.1} change={this.onSpeedChange} tooltip="hide" />
                    </div>
                  ) : (
                    <div className="pui-btn pui-speed-slider hidden">
                      <ReactBootstrapSlider value={this.state.speed} min={-6} max={6} step={0.1} change={this.onSpeedChange} tooltip="hide" />
                    </div>
                  ) }
                </div>
              </div>
              <div className="pui-btns-right">
                <div className="pui-cont" onMouseEnter={() => this.setState({showCameras: true})} onMouseLeave={() => this.setState({showCameras: false})}>
                  {this.state.showCameras ? (
                    <div className="pui-cont pui-cameras">
                      <div className="pui-btn" id="camera1" onClick={() => this.setState({camera: 1})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 1</span>
                      </div>
                      <div className="pui-btn" id="camera2" onClick={() => this.setState({camera: 2})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 2</span>
                      </div>
                      <div className="pui-btn" id="camera3" onClick={() => this.setState({camera: 3})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 3</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pui-cont pui-cameras hidden">
                      <div className="pui-btn" id="camera1" onClick={() => this.setState({camera: 1})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 1</span>
                      </div>
                      <div className="pui-btn" id="camera2" onClick={() => this.setState({camera: 2})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 2</span>
                      </div>
                      <div className="pui-btn" id="camera3" onClick={() => this.setState({camera: 3})}>
                        <Glyphicon className="pui-btns-glyph-small" glyph="facetime-video" />
                        <span> 3</span>
                      </div>
                    </div>
                  ) }
                  <div className="pui-btn">
                    <Glyphicon className="pui-btns-glyph" glyph="facetime-video" />
                    <span>{" " + this.state.camera}</span>
                  </div>
                </div>
                <div className="pui-btn" onClick={this.goFull}>
                  {this.state.isFull ? <Glyphicon className="pui-btns-glyph" glyph="fullscreen" /> : <Glyphicon className="pui-btns-glyph" glyph="fullscreen" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fullscreen>
    )
  }

}

export default Replay;
