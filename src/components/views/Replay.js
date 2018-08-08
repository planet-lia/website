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
      isPlaying: true,
      insideSpeedSlider: false,
      speedSliderTabId: -1,
      showCameras: false,
      isFull: false,
      overlayOpacity: 0,
    }

  }

  componentDidMount = () => {
    this.checkAndRun();
  }

  componentWillUnmount = () => {
    this.state.replay.destroyReplay();
  }

  checkAndRun = () => {
    if(window.liaGame){
      this.setState({
        replay: window.liaGame.playReplay(
          this.props.containerId,
          "/assets/",
          "/assets/replays/replay_" + this.props.number + ".lia",
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

  onChangeTime = (event) => {
    this.state.replay.changeTime(event.target.value);
    if(this.state.isPlaying===false){
      this.state.replay.forceUpdate();
    }
    this.setState({
      time: event.target.value,
    });
  }

  onTogglePlay = () => {
    if(this.state.isPlaying===true){
      this.state.replay.pause();
      this.setState({
        isPlaying: false,
      });
    } else {
      this.state.replay.resume();
      this.setState({
        isPlaying: true,
      });
    }

    //overlayAnimation
    this.setState({ overlayOpacity: 0.7 })
    setTimeout(() => this.setState({ overlayOpacity: 0 }), 250);
  }

  onResetSpeed = () => {
    this.state.replay.changeSpeed(1);
    this.setState({
      speed: 1,
      speedSliderTabId: 1
    });
  }

  onSpeedChange = (event) => {
    this.state.replay.changeSpeed(event.target.value);
    this.setState({
      speed: event.target.value,
      speedSliderTabId: 1
    });
  }

  onCamChange(camId){
    this.state.replay.changeCamera(camId);
    if(this.state.isPlaying===false){
      this.state.replay.forceUpdate();
    }
    this.setState({ camera: camId+1 });
  }

  goFull = () => {
    if(this.state.isFull===true){
      this.setState({ isFull: false });
    } else {
      this.setState({ isFull: true });
    }
  }

  render() {
    return (
      <Fullscreen
        enabled={this.state.isFull}
        onChange={isFull => this.setState({isFull})}
      >
        <div className="cont-player">
          <div className="row-replay" onClick={this.onTogglePlay} onDoubleClick={this.goFull}>
              <div id={ this.props.containerId }></div>
              {this.state.isPlaying ? (
                <Glyphicon className="player-overlay" glyph="play" style={{opacity: this.state.overlayOpacity}}/>
              ) : (
                <Glyphicon className="player-overlay" glyph="pause" style={{opacity: this.state.overlayOpacity}}/>
              )}
          </div>
          <div className="row-pui">
            <div className="pui-timeline">
              <ReactBootstrapSlider value={this.state.time} min={0} max={this.state.duration} step={0.01} change={this.onChangeTime} tooltip="hide" />
            </div>
            <div className="pui-buttons">
              <div className="pui-btns-left">
                <div className="pui-btn" onClick={this.onTogglePlay}>
                  {this.state.isPlaying ? (
                    <Glyphicon className="pui-btns-glyph" glyph="pause" />
                  ) : (
                    <Glyphicon className="pui-btns-glyph" glyph="play" />
                  )}
                </div>
                <div className="pui-cont"
                  onMouseEnter={ () => this.setState({insideSpeedSlider: true}) }
                  onMouseLeave={ () => this.setState({insideSpeedSlider: false}) }
                >
                  <div className="pui-btn pui-btn-wide">
                    <span className="pui-text">{this.state.speed + "x"}</span>
                  </div>
                  {(this.state.insideSpeedSlider ||  this.state.speedSliderTabId>0) ? (
                    <div className="pui-speed-slider"
                      tabIndex={ this.state.speedSliderTabId }
                      onBlur={
                        this.state.insideSpeedSlider ? (
                          null
                        ) : (
                          () => this.setState({
                            insideSpeedSlider: false,
                            speedSliderTabId: -1
                          })
                        )
                      }
                    >
                      <span className="pui-divider"></span>
                      <ReactBootstrapSlider
                        value={this.state.speed}
                        min={-6}
                        max={6}
                        step={0.1}
                        change={this.onSpeedChange}
                        tooltip="hide"
                        />
                        <span className="pui-divider"></span>
                        <span className="pui-btn" onClick={this.onResetSpeed}>
                          <Glyphicon className="pui-btns-glyph" glyph="refresh" />
                        </span>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="pui-btns-right">
                <div className="pui-cont" onMouseEnter={() => this.setState({showCameras: true})} onMouseLeave={() => this.setState({showCameras: false})}>
                  {this.state.showCameras ? (
                    <div className="pui-cont pui-cameras">
                      <div className="pui-btn" onClick={() => this.onCamChange(0)} style={this.state.camera===1 ? {color: "#facd3b"} : {}}>
                        <Glyphicon glyph="facetime-video" />
                        <span className="pui-text"> 1</span>
                      </div>
                      <div className="pui-btn" onClick={() => this.onCamChange(1)} style={this.state.camera===2 ? {color: "#facd3b"} : {}}>
                        <Glyphicon glyph="facetime-video" />
                        <span className="pui-text"> 2</span>
                      </div>
                      <div className="pui-btn" onClick={() => this.onCamChange(2)} style={this.state.camera===3 ? {color: "#facd3b"} : {}}>
                        <Glyphicon glyph="facetime-video" />
                        <span className="pui-text"> 3</span>
                      </div>
                      <span className="pui-divider"></span>
                    </div>
                  ) : null }
                  <div className="pui-btn">
                    <Glyphicon className="pui-btns-glyph" glyph="facetime-video" />
                    <span className="pui-text">{" " + this.state.camera}</span>
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