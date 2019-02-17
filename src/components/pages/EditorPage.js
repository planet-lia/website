import React, { Component } from 'react';
import { Button, FormControl, Glyphicon } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import Loader from 'react-loader-spinner'
import Cookies from 'universal-cookie';
import ReactResizeDetector from 'react-resize-detector';

import Replay from '../elems/Replay';
import Popup from '../views/Popup';
import PopupConfirm from '../views/PopupConfirm';
import WaitAlert from '../elems/WaitAlert';
import { programmingLanguages } from '../../utils/constants/programmingLanguages';


class EditorPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      currentLang: "python3",
      newLang: null,
      currentLog: "Press RUN to generate a game.",
      currentReplayFileBase64: "",
      generatingGame: false,
      gameKey: 0,
      isLoadingCode: true,
      editorW: "100%",
      editorH: "100%",
      lastPlay: null,
      showWaitAlert: false,
      showResetAlert: false,
      waitRemain: 0,
      isCodeChanged: false,
      isLangChange: false
    };
  }

  componentDidMount = () => {
    window.addEventListener('fullscreenchange', this.scrollToBottom);
    window.addEventListener('webkitfullscreenchange', this.scrollToBottom);
    window.addEventListener('mozfullscreenchange', this.scrollToBottom);
    window.addEventListener('MSFullscreenChange', this.scrollToBottom);

    let lang = this.state.currentLang;
    if(localStorage.editorProgLang) {
      lang = localStorage.editorProgLang
    }

    if(localStorage.editorCode) {
      this.setState({
        code: localStorage.editorCode,
        currentLang: lang,
        isLoadingCode: false,
        isCodeChanged: true
      });
    } else {
      const langData = programmingLanguages[lang];
      fetch(langData.baseBotUrl)
        .then((resp)=>{ return resp.text() })
        .then( (text) =>
          this.setState({
            code: text,
            currentLang: lang,
            isLoadingCode: false,
            isCodeChanged: false
          })
        );
    }
  }

  componentWillUnmount = () => {
    const { code, currentLang, isCodeChanged, isLangChange } = this.state;
    window.removeEventListener('fullscreenchange', this.scrollToBottom);
    window.removeEventListener('webkitfullscreenchange', this.scrollToBottom);
    window.removeEventListener('mozfullscreenchange', this.scrollToBottom);
    window.removeEventListener('MSFullscreenChange', this.scrollToBottom);

    if(isCodeChanged) {
      localStorage.setItem("editorCode", code);
    }
    if(isLangChange){
      localStorage.setItem("editorProgLang", currentLang);
    }
  }


  onChange = (newValue, e) => {
    this.setState({
      code: newValue,
      isCodeChanged: true,
    });
  }

  onChangeLanguage = (event) => {
    this.onChangeCode(event.target.value);
  }

  onResetLanguage = () => {
    this.onChangeCode(this.state.currentLang);
  }

  onChangeCode = (lang) => {
    if(this.state.isCodeChanged){
      this.setState({
        showResetAlert: true,
        newLang: lang,
      })
    } else {
      this.setLanguage(lang);
    }
  }

  onConformation = () => {
    this.setLanguage(this.state.newLang)
    this.setState({
      showResetAlert: false,
      newLang: null
    })
  }

  setLanguage = (lang) => {
    const langData = programmingLanguages[lang];
    let langChanged = true;

    if(lang===this.state.currentLang){
      langChanged = false;
    }

    // Store current language
    this.setState({
      isLoadingCode: true
    });

    fetch(langData.baseBotUrl)
      .then((resp)=>{ return resp.text() })
      .then( (text) => {this.setState({
        currentLang: lang,
        code: text,
        isLoadingCode: false,
        isCodeChanged: !langChanged,
        isLangChange: langChanged
      })
      localStorage.removeItem("editorCode");
      localStorage.setItem("editorProgLang", lang);
    });
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
      showWaitAlert: false,
      showResetAlert: false,
      newLang: null
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
      showResetAlert,
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
                <FormControl componentClass="select" onChange={this.onChangeLanguage} disabled={isLoadingCode} value={currentLang} bsClass="form-control editor-input" bsSize="small">
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
                  <Glyphicon glyph="play" />
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
          dialogClassName="custom-popup pop-editor-sm pop-text"
          show={showWaitAlert}
          onHide={this.onPopupClose}
          onButtonClick={this.onPopupClose}
          heading="Please wait"
          buttonText="OK"
          center={true}
        >
          <WaitAlert wait={waitRemain}/>
        </Popup>

        <PopupConfirm
          dialogClassName="custom-popup pop-editor-sm pop-text"
          show={showResetAlert}
          onHide={this.onPopupClose}
          onButtonClick={this.onConformation}
          heading="Warning"
        >
          <p>If you change programming language, your changes will be lost.</p>
        </PopupConfirm>

      </div>
    );
  }
}

export default EditorPage;
