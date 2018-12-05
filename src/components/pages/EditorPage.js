import React, { Component } from 'react';
import { Row, Col, Button, ButtonToolbar, SplitButton, MenuItem, Modal, FormControl } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import Loader from 'react-loader-spinner'
import Cookies from 'universal-cookie';

import Replay from '../views/Replay';
import Popup from '../views/Popup';
import WaitAlert from '../forms/WaitAlert';
import { programmingLanguages } from '../../utils/constants/programmingLanguages';


class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currentLang: "python3",
      currentLog: "Press PLAY to generate your first game.",
      currentReplayFileBase64: "",
      generatingGame: false,
      isLoadingCode: true,
      editor: null,
      lastPlay: null,
      showWaitAlert: false,
      waitRemain: 0
    };
  }

  componentDidMount = () => {
    const langData = programmingLanguages[this.state.currentLang];

    fetch(langData.baseBotUrl)
      .then((resp)=>{ return resp.text() })
      .then( (text) => this.setState({
        code: text,
        isLoadingCode: false
      }) );
  }


  onChange = (newValue, e) => {
    this.setState({ code: newValue });
  }

  onChangeLanguage = (event) => {
    const lang = event.target.value;
    const langData = programmingLanguages[lang];

    // Store current language
    this.setState({
      currentLang: lang,
      isLoadingCode: true
    });

    fetch(langData.baseBotUrl)
      .then((resp)=>{ return resp.text() })
      .then( (text) => this.setState({
        code: text,
        isLoadingCode: false
      }) );
  };

  generateGame = async () => {
    const { lastPlay } = this.state;
    const newPlay = new Date();
    const delayMiliSec = 15000;

    if(lastPlay && (newPlay - lastPlay) < delayMiliSec){
      this.setState({
        showWaitAlert: true,
        waitRemain: Math.ceil( (delayMiliSec - Number(newPlay - lastPlay)) /1000 )
      })
      return;
    }
    // Let the user know that the game is being generated
    this.setState({
      generatingGame: true,
    });

    // Set if tracking is enabled
    const cookies = new Cookies();
    let isTrackingOn = cookies.get('editor-tracking') !== "false";

    console.log(isTrackingOn + "  " + cookies.get('editor-tracking'));

    // Generate replay
    const response = await fetch('https://editor.cloud1.liagame.com/generate?tracking=' + isTrackingOn, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          language: this.state.currentLang,
          code:     this.state.code
      })});
    const json = await response.json();

    // TODO handle if there is an error!
    let trackingId = json['trackingId'];

    // Fetch results
    for (let i = 0; i < 60; i++) {
      const response = await fetch('https://editor.cloud1.liagame.com/results/' + trackingId, {
          method: 'GET',
          headers: {
              'Accept': 'application/json',
          }});
      const json2 = await response.json();

      // Update current logs
      // TODO append Generating a new game. This may take up to 20 seconds...
      // if fetch always returns full log: YES
      this.setState({ currentLog: json2['game']['log'] });
      this.scrollToBottom();


      if (json2['game']['finished']) {
          // Display new replay file
          this.setState({
            currentReplayFileBase64: json2['game']['replay'],
            generatingGame: false,
            lastPlay: new Date()
          });
          return;
      }

      await this.sleep(500);
    }

    console.error("Failed to fetch game results in time.")

  };

  sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  scrollToBottom = () => {
    if(this.textLog){
      this.textLog.scrollTop = this.textLog.scrollHeight;
    }
  };

  onPopupClose = () => {
    this.setState({
      showWaitAlert: false
    })
  }

  render() {
    // TODO beautify this
    const { code, currentLang, generatingGame, isLoadingCode, showWaitAlert, waitRemain } = this.state;
    const highlighting = programmingLanguages[currentLang].highlighting;

    const options = {
      selectOnLineNumbers: true,
      fontSize: 12,
      scrollBeyondLastLine: false,
      minimap: {
        enabled: false
      },
    };

    return (
      <div>
        <div className="cont-fullpage">
          <div className="editor-notification">
            {"This is just a demo. For full experience "}
            <a href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">download SDK</a>
            .
          </div>
          <div className="editor-cont-page">
            <div id="editor-left">
              <div id="cont-editor">
                <MonacoEditor
                  width="100%"
                  height="100%"
                  language={highlighting}
                  theme="vs-dark"
                  value={code}
                  options={options}
                  onChange={this.onChange}
                />
              </div>
              <div id="editor-cont-ui" className="editor-cont-bottom">
                <div>
                  <div id="editor-lang">
                    <FormControl componentClass="select" dropup={"true"} onChange={this.onChangeLanguage} disabled={isLoadingCode} bsClass="form-control editor-input">
                      <option value="python3">Python3</option>
                      <option value="java">Java</option>
                      <option value="kotlin">Kotlin</option>
                    </FormControl>
                  </div>
                  <div id="editor-cont-links">
                    Links:
                    <a href="https://docs.liagame.com/game-rules/" target="_blank" rel="noopener noreferrer">Game rules</a>
                    <a href="https://docs.liagame.com/api/" target="_blank" rel="noopener noreferrer">API</a>
                    <a href="https://docs.liagame.com/examples/aiming-at-the-opponent/" target="_blank" rel="noopener noreferrer">Examples</a>
                    <a href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">Download SDK</a>
                  </div>
                </div>
                <div id="editor-play">
                  <Button bsClass="btn custom-btn" onClick={() => this.generateGame()} type="button" disabled={generatingGame || isLoadingCode}>PLAY</Button>
                </div>
              </div>
            </div>
            <div id="editor-right">
              {/* Key resets the replay; instead of currentReplayFileBase64 do gameID */}
              <div id="editor-cont-replay" key={this.state.currentReplayFileBase64}>
                { this.state.currentReplayFileBase64!=="" ? <Replay containerId="player" number={ 1 } replayFileBase64={ this.state.currentReplayFileBase64 } /> : null }
              </div>
              <div id="editor-cont-log" className="editor-cont-bottom">
                <FormControl
                  componentClass="textarea"
                  value={this.state.currentLog}
                  inputRef={ref => { this.textLog = ref; }}
                  readOnly
                  bsClass="form-control editor-input"
                />
              </div>
              {generatingGame &&
                <div id="editor-loader-overlay">
                  <div id="cont-loader">
                    <Loader
                      type="Triangle"
                      color="#018e6a"
                      height="100"
                      width="100"
                    />
                  </div>
                </div>
              }
            </div>
          </div>
        </div>

        <Popup
          dialogClassName="custom-popup pop-text"
          show={showWaitAlert}
          onHide={this.onPopupClose}
          onButtonClick={this.onPopupClose}
          heading="Please wait"
          buttonText="Ok"
        >
          <WaitAlert wait={waitRemain}/>
        </Popup>

      </div>
    );
  }
}

export default EditorPage;