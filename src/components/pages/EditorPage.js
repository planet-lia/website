import React, { Component } from 'react';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import Loader from 'react-loader-spinner'
import Cookies from 'universal-cookie';
import ReactResizeDetector from 'react-resize-detector';

import Replay from '../elems/Replay';
import Popup from '../views/Popup';
import WaitAlert from '../forms/WaitAlert';
import { programmingLanguages } from '../../utils/constants/programmingLanguages';


class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currentLang: "python3",
      currentLog: "Press RUN to generate a game.",
      currentReplayFileBase64: "",
      generatingGame: false,
      gameKey: 0,
      isLoadingCode: true,
      editorW: "100%",
      editorH: "100%",
      lastPlay: null,
      showWaitAlert: false,
      waitRemain: 0
    };
  }

  componentDidMount = () => {
    window.addEventListener('fullscreenchange', this.scrollToBottom);
    window.addEventListener('webkitfullscreenchange', this.scrollToBottom);
    window.addEventListener('mozfullscreenchange', this.scrollToBottom);
    window.addEventListener('MSFullscreenChange', this.scrollToBottom);

    const langData = programmingLanguages[this.state.currentLang];

    fetch(langData.baseBotUrl)
      .then((resp)=>{ return resp.text() })
      .then( (text) => this.setState({
        code: text,
        isLoadingCode: false
      }) );
  }

  componentWillUnmount = () => {
    window.removeEventListener('fullscreenchange', this.scrollToBottom);
    window.removeEventListener('webkitfullscreenchange', this.scrollToBottom);
    window.removeEventListener('mozfullscreenchange', this.scrollToBottom);
    window.removeEventListener('MSFullscreenChange', this.scrollToBottom);
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
    const currentTime = new Date();
    const delayMiliSec = 15000;

    if(lastPlay && (currentTime - lastPlay) < delayMiliSec){
      this.setState({
        showWaitAlert: true,
        waitRemain: Math.ceil( (delayMiliSec - Number(currentTime - lastPlay)) /1000 )
      })
      return;
    }
    // Let the user know that the game is being generated
    this.setState({
      currentReplayFileBase64: "",
      generatingGame: true,
      gameKey: this.state.gameKey + 1,
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
      this.setState({ currentLog: json2['game']['log'] });
      this.scrollToBottom();


      if (json2['game']['finished']) {
          // Display new replay file
          this.setState({
            currentReplayFileBase64: json2['game']['replay'],
            generatingGame: false,
            gameKey: this.state.gameKey + 1,
            lastPlay: new Date(),
            waitRemain: 0
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

  resizePlayer = (width, height) => {
    this.setState({editorW: width, editorH: height});
  }

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
    const {
      code,
      currentLang,
      currentLog,
      currentReplayFileBase64,
      generatingGame,
      gameKey,
      isLoadingCode,
      editorW,
      editorH,
      showWaitAlert,
      waitRemain
    } = this.state;
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
        <div className="cont-fullpage editor-cont-page">
          <div id="editor-left">
            <div id="editor-cont-ui">
              <div id="editor-lang">
                <FormControl componentClass="select" onChange={this.onChangeLanguage} disabled={isLoadingCode} bsClass="form-control editor-input" bsSize="small">
                  <option value="python3">Python3</option>
                  <option value="java">Java</option>
                  <option value="kotlin">Kotlin</option>
                </FormControl>
              </div>
              <div id="editor-cont-links">
                <div>
                  <Button bsClass="btn btn-sm custom-btn btn-on-dark" href="https://docs.liagame.com/game-rules/" target="_blank" rel="noopener noreferrer">Game rules</Button>
                  <Button bsClass="btn btn-sm custom-btn btn-on-dark" href="https://docs.liagame.com/api/" target="_blank" rel="noopener noreferrer">API</Button>
                </div>
                <div>
                  <Button bsClass="btn btn-sm custom-btn btn-on-dark" href="https://docs.liagame.com/examples/aiming-at-the-opponent/" target="_blank" rel="noopener noreferrer">Examples</Button>
                  <Button bsClass="btn btn-sm custom-btn btn-on-dark" href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">Download</Button>
                </div>
              </div>
              <div id="editor-btn-run">
                <Button bsClass="btn btn-sm custom-btn btn-on-dark" onClick={() => this.generateGame()} type="button" disabled={generatingGame || isLoadingCode}>
                  <Glyphicon glyph="cog" />
                  {" RUN"}
                </Button>
              </div>
            </div>
            <div id="cont-editor">
              <MonacoEditor
                width={editorW}
                height={editorH}
                language={highlighting}
                theme="vs-dark"
                value={code}
                options={options}
                onChange={this.onChange}
              />
              <ReactResizeDetector handleWidth handleHeight onResize={(width, height) => this.resizePlayer(width, height)} />
            </div>
          </div>
          <div id="editor-right">
            <div id="editor-notification">
              {"This is just a demo. For full experience "}
              <a href="https://docs.liagame.com/getting-started/" target="_blank" rel="noopener noreferrer">download SDK</a>
              .
            </div>
            {/* Key resets the replay; instead of currentReplayFileBase64 do gameID */}
            <div id="editor-cont-replay" key={gameKey}>
              <Replay containerId="player" number={ 0 } replayFileBase64={ currentReplayFileBase64 } />
              {generatingGame &&
                <div id="editor-loader-overlay">
                  <div className="cont-loader">
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
            <div id="editor-cont-log">
              <FormControl
                componentClass="textarea"
                value={currentLog}
                inputRef={ref => { this.textLog = ref; }}
                readOnly
                bsClass="form-control editor-input"
              />
            </div>
          </div>
        </div>

        <Popup
          dialogClassName="custom-popup pop-text"
          show={showWaitAlert}
          onHide={this.onPopupClose}
          onButtonClick={this.onPopupClose}
          heading="Please wait"
          buttonText="OK"
        >
          <WaitAlert wait={waitRemain}/>
        </Popup>

      </div>
    );
  }
}

export default EditorPage;
