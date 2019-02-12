import React, { Component } from 'react';
import Fullscreen from 'react-full-screen';
import {Col, Glyphicon, Row} from 'react-bootstrap';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import {Line} from 'react-chartjs-2';

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
      forceReplayWidth: "100%",
      powerData: [],
      resourceData: [],
      workersData: [],
      warriorsData: [],
      unitsData: [],
      player1Name: "",
      player2Name: "",
      showStatistics: false,
      player1AllowBubbles: true,
      player2AllowBubbles: true
    }
    this.puiRef = React.createRef();
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateReplayWidth);
    window.addEventListener('fullscreenchange', this.resizeReplay);
    window.addEventListener('webkitfullscreenchange', this.resizeReplay);
    window.addEventListener('mozfullscreenchange', this.resizeReplay);
    window.addEventListener('MSFullscreenChange', this.resizeReplay);
    this.updateReplayWidth();
    if(this.props.number || this.props.replayFileBase64 || this.props.replayUrl){
      this.checkAndRun();
    }
    if (this.props.player1Name && this.props.player2Name) {
        this.setState({
            showStatistics: true,
            player1Name: this.props.player1Name,
            player2Name: this.props.player2Name,
        });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateReplayWidth);
    window.removeEventListener('fullscreenchange', this.resizeReplay);
    window.removeEventListener('webkitfullscreenchange', this.resizeReplay);
    window.removeEventListener('mozfullscreenchange', this.resizeReplay);
    window.removeEventListener('MSFullscreenChange', this.resizeReplay);
    if(this.state.replay){
      this.state.replay.destroyReplay();
    }
  }

  updateReplayWidth = () => {
    let containerWidth = "100%";
    const avalibleW = window.screen.width;
    const avalibleH = window.screen.height - this.puiRef.current.clientHeight;
    const avalibleRatio = (avalibleW/avalibleH).toFixed(2);
    const replayRatio = (16/9).toFixed(2);

    if(avalibleRatio > replayRatio){
      containerWidth = (((avalibleH * replayRatio)/avalibleW)*100).toFixed(2) + "%";
    }

    if(containerWidth !== this.state.forceReplayWidth){
      this.setState({ forceReplayWidth: containerWidth });
      this.resizeReplay();
    }
  }

  resizeReplay = () => {
    if(this.state.replay){
      this.state.replay.resize();
    }
  }

  checkAndRun = () => {
    if(window.liaGame){
      let replayUrl = "/assets/replays/replay_" + this.props.number + ".lia";
      if(this.props.replayUrl){
        replayUrl = this.props.replayUrl;
      }
      this.setState({
        replay: window.liaGame.playReplay(
          this.props.containerId,
          "/assets/",
          replayUrl,
          this.props.replayFileBase64,
          "/assets/banned-words.txt",
          this.setGameDuration,
          this.setTime,
          this.setGameStatistics,
          this.state.player1AllowBubbles,
          this.state.player2AllowBubbles
        )
      });
    } else {
      setTimeout(this.checkAndRun, 100);
    }
  }

  setGameStatistics = (gameStatistics) => {
      // General options for charts
      let chartOptions = {
          scales: {
              xAxes: [{
                  type: 'time',
                  distribution: 'linear',
                  time: {
                      displayFormats: {
                          'millisecond': 'SSS',
                          'second': 'SSS',
                          'minute': 'SSS',
                          'hour': 'SSS',
                          'day': 'SSS',
                          'week': 'SSS',
                          'month': 'SSS',
                          'quarter': 'SSS',
                          'year': 'SSS',
                      }
                  }
              }]
          }
      };

      // Build data
      let labels = [];
      let powers = [[], []];
      let workers = [[], []];
      let warriors = [[], []];
      let units = [[], []];
      let resources = [[], []];

      let pushResourcePoint = function (i, prevValue, currentValue) {
          let nGatheredResources = (resources[i].length === 0) ? 0 : resources[i][resources[i].length - 1];

          if (prevValue < currentValue) {
              resources[i].push(nGatheredResources + (currentValue - prevValue))
          } else {
              resources[i].push(nGatheredResources)
          }
      };

      for (let i = 0; i < gameStatistics.length; i++) {
          let s = gameStatistics[i];
          labels.push(Math.floor(s.time));
          powers[0].push(s.team1.power);
          powers[1].push(s.team2.power);

          workers[0].push(s.team1.workers);
          workers[1].push(s.team2.workers);

          warriors[0].push(s.team1.warriors);
          warriors[1].push(s.team2.warriors);

          units[0].push(s.team1.warriors + s.team1.workers);
          units[1].push(s.team2.warriors + s.team2.workers);

          pushResourcePoint(
              0,
              (i === 0) ? 0 : gameStatistics[i-1].team1.resources,
              s.team1.resources
          );
          pushResourcePoint(
              1,
              (i === 0) ? 0 : gameStatistics[i-1].team2.resources,
              s.team2.resources
          );
      }


      // Power graph
      let powerData = {
          labels: labels,
          datasets: [
              this.getDatasetOptions(this.state.player1Name, powers[0]),
              this.getDatasetOptions(this.state.player2Name, powers[1])
          ]
      };
      let resourceData = {
          labels: labels,
          datasets: [
              this.getDatasetOptions(this.state.player1Name, resources[0]),
              this.getDatasetOptions(this.state.player2Name, resources[1])
          ]
      };
      let workersData = {
          labels: labels,
          datasets: [
              this.getDatasetOptions(this.state.player1Name, workers[0]),
              this.getDatasetOptions(this.state.player2Name, workers[1])
          ]
      };
      let warriorsData = {
          labels: labels,
          datasets: [
              this.getDatasetOptions(this.state.player1Name, warriors[0]),
              this.getDatasetOptions(this.state.player2Name, warriors[1])
          ]
      };

      let unitsData = {
          labels: labels,
          datasets: [
              this.getDatasetOptions(this.state.player1Name, units[0]),
              this.getDatasetOptions(this.state.player2Name, units[1])
          ]
      };

      this.setState({
          powerData: powerData,
          resourceData: resourceData,
          workersData: workersData,
          warriorsData: warriorsData,
          chartOptions: chartOptions,
          unitsData: unitsData,
      });
  }

  getDatasetOptions = (playerName, data) => {
      let color = (playerName === this.state.player1Name) ? "#D9C72E" : "#019170";
      return {
          label: playerName,
          fill: false,
          lineTension: 0.1,
          backgroundColor: color,
          borderColor: color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: color,
          pointBackgroundColor: color,
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: color,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: data
      };
  }

  setGameDuration = (duration) => {
    this.setState({duration: duration});
  }

  setTime = (time) => {
    this.setState({time: time});
  }

  onChangeTime = (event) => {
    if(this.state.replay===null) return;

    if(this.state.replay){
        this.state.replay.changeTime(event.target.value);
      if(this.state.isPlaying===false){
        this.state.replay.forceUpdate();
      }
    }
    this.setState({
      time: event.target.value,
    });
  }

  onTogglePlay = () => {
    if(this.state.replay===null) return;

    if(this.state.isPlaying===true){
      if(this.state.replay){
        this.state.replay.pause();
      }
      this.setState({
        isPlaying: false,
      });
    } else {
      if(this.state.replay){
        this.state.replay.resume();
      }
      this.setState({
        isPlaying: true,
      });
    }

    //overlayAnimation
    this.setState({ overlayOpacity: 0.7 })
    setTimeout(() => this.setState({ overlayOpacity: 0 }), 250);
  }

  onResetSpeed = () => {
    if(this.state.replay===null) return;

    if(this.state.replay){
      this.state.replay.changeSpeed(1);
    }
    this.setState({
      speed: 1,
      speedSliderTabId: 1
    });
  }

  onSpeedChange = (event) => {
    if(this.state.replay===null) return;

    if(this.state.replay){
      this.state.replay.changeSpeed(event.target.value);
    }
    this.setState({
      speed: event.target.value,
      speedSliderTabId: 1
    });
  }

  onCamChange = (camId) => {
    if(this.state.replay===null) return;

    if(this.state.replay){
      this.state.replay.changeCamera(camId);
      if(this.state.isPlaying===false){
        this.state.replay.forceUpdate();
      }
    }
    this.setState({ camera: camId+1 });
  }

  goFull = () => {
    if(this.state.replay===null) return;

    let goFullScreen;

    if(this.state.isFull===true){
      goFullScreen = false;
    } else {
      goFullScreen = true;
    }

    this.setState({ isFull: goFullScreen });
    this.resizeReplay();
  }

  render() {
      return (
        <div>
            <Row>
                <Col sm={8}>
                <Fullscreen
                    enabled={this.state.isFull}
                    onChange={isFull => this.setState({isFull})}
                >
                    <div className={this.state.replay===null ? "cont-player no-replay" : "cont-player"}>
                        <div className="row-replay" onClick={this.onTogglePlay} onDoubleClick={this.goFull}>
                            <div id={ this.props.containerId } style={{width: (this.state.isFull ? this.state.forceReplayWidth : "100%") }}></div>
                            <div className="player-overlay"></div>
                            {this.state.isPlaying ? (
                                <Glyphicon className="player-overlay-icon" glyph="play" style={{opacity: this.state.overlayOpacity}}/>
                            ) : (
                                <Glyphicon className="player-overlay-icon" glyph="pause" style={{opacity: this.state.overlayOpacity}}/>
                            )}
                        </div>
                        <div className="row-pui" ref={ this.puiRef }>
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
                                        {(this.state.replay!==null) && (this.state.insideSpeedSlider ||  this.state.speedSliderTabId>0) ? (
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
                                        {(this.state.replay!==null) && this.state.showCameras ? (
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
                </Col>
                <Col sm={4}>
                    {(this.state.showStatistics)
                        ? (
                            <div>
                                <h4>Power</h4>
                                < Line data={this.state.powerData} options={this.state.chartOptions}/>

                                <h4>Resources</h4>
                                < Line data={this.state.resourceData} options={this.state.chartOptions}/>
                            </div>
                        ) : null
                    }
                </Col>
            </Row>
            {(this.state.showStatistics)
                ? (
                    <Row>
                        <Col sm={4}>
                            <h4>Workers</h4>
                            < Line data={this.state.workersData} options={this.state.chartOptions}/>
                        </Col>
                        <Col sm={4}>
                            <h4>Warriors</h4>
                            < Line data={this.state.warriorsData} options={this.state.chartOptions}/>
                        </Col>
                        <Col sm={4}>
                            <h4>Units</h4>
                            < Line data={this.state.unitsData} options={this.state.chartOptions}/>
                        </Col>
                    </Row>
                ) : null
            }

            {/*{(this.state.showStatistics)*/}
                {/*? (*/}
                {/*<div>*/}
                    {/*<Row>*/}
                        {/*<Col sm={6}>*/}
                            {/*<h3>Power</h3>*/}
                            {/*< Line data={this.state.powerData} options={this.state.chartOptions}/>*/}
                        {/*</Col>*/}
                        {/*<Col sm={6}>*/}
                            {/*<h3>Resources</h3>*/}
                            {/*< Line data={this.state.resourceData} options={this.state.chartOptions}/>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                        {/*<Col sm={4}>*/}
                            {/*<h3>Workers</h3>*/}
                            {/*< Line data={this.state.workersData} options={this.state.chartOptions}/>*/}
                        {/*</Col>*/}
                        {/*<Col sm={4}>*/}
                            {/*<h3>Warriors</h3>*/}
                            {/*< Line data={this.state.warriorsData} options={this.state.chartOptions}/>*/}
                        {/*</Col>*/}
                        {/*<Col sm={4}>*/}
                            {/*<h3>Units</h3>*/}
                            {/*< Line data={this.state.unitsData} options={this.state.chartOptions}/>*/}
                        {/*</Col>*/}
                    {/*</Row>*/}
                {/*</div>*/}
                {/*) : null*/}
            {/*}*/}

        </div>

    )
  }

}

export default Replay;
