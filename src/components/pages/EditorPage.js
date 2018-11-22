import React, { Component } from 'react';
import { Row, Col, Button, ButtonToolbar, SplitButton, MenuItem, Modal } from 'react-bootstrap';
import MonacoEditor from 'react-monaco-editor';
import Replay from "../views/Replay";


class EditorPage extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);

        this.state = {
            code: '',
            languages: {
                "python3": {
                    highlighting: "python",
                    baseBotUrl: "https://raw.githubusercontent.com/liagame/python3-bot/v0.2.0/my_bot.py"
                },
                "java": {
                    highlighting: "java",
                    baseBotUrl: "https://raw.githubusercontent.com/liagame/java-bot/v0.2.0/src/MyBot.java"
                },
                "kotlin": {
                    highlighting: "java",
                    baseBotUrl: "https://raw.githubusercontent.com/liagame/kotlin-bot/v0.2.0/src/MyBot.kt"
                },
            },
            currentLang: "python3",
            currentLog: "",
            currentReplayFileBase64: "",
            generatingGame: false,
            editor: null,
        };

        this.changeLanguage(this.state.currentLang)
    }

    editorDidMount(editor, monaco) {
        editor.focus();
    }

    onChange(newValue, e) {
        this.setState({ code: newValue });
    }

    changeLanguage = (lang) => {
        let langData = this.state.languages[lang];

        // Store current language
        this.setState({ currentLang: lang});

        fetch(langData.baseBotUrl)
            .then((resp)=>{ return resp.text() })
            .then((text)=>{
                this.setState({ code: text });
            });
    };

    generateGame = () => {
        // Let the user know that the game is being generated
        this.setState({ currentLog: "Generating a new game. This may take up to 20 seconds..." });
        this.setState({ generatingGame: true });

        // Generate the game
        fetch('https://editor.cloud1.liagame.com/generate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: this.state.currentLang,
                code:     this.state.code
            })})
            .then((resp)=>{ return resp.json() })
            .then((json)=>{

                // Update current logs
                this.setState({ currentLog: json['game']['log'] });
                this.setState({ generatingGame: false });

                // Display new replay file
                this.setState({ currentReplayFileBase64: json['game']['replay']})
            })
    };

    render() {
        const code = this.state.code;
        const highlighting = this.state.languages[this.state.currentLang].highlighting;
        const lang = this.state.currentLang;
        const generatingGame = this.state.generatingGame;

        const options = {
            selectOnLineNumbers: true,
            fontSize: 12,
            scrollBeyondLastLine: false
        };

        let spinner = "";
        if (generatingGame) {
            spinner = <img style={{width: '150px'}} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" />
        }

        return (
            <div>
                <div>
                    <Row>
                        <Col md={6}>
                            <Row>
                            <MonacoEditor
                                width="100%"
                                height="800"
                                language={highlighting}
                                theme="vs-dark"
                                value={code}
                                options={options}
                                onChange={this.onChange}
                                editorDidMount={this.editorDidMount}
                            />
                            </Row>
                            <Row>
                                <Col md={2}>
                                    <ButtonToolbar>
                                        <SplitButton title={lang} dropup id="split-button-dropup">
                                            <MenuItem eventKey="1" bsStyle="primary" onClick={() => this.changeLanguage("python3")} type="button">Python3</MenuItem>
                                            <MenuItem eventKey="2" bsStyle="primary" onClick={() => this.changeLanguage("java")} type="button">Java</MenuItem>
                                            <MenuItem eventKey="3" bsStyle="primary" onClick={() => this.changeLanguage("kotlin")} type="button">Kotlin</MenuItem>
                                        </SplitButton>
                                    </ButtonToolbar>
                                </Col>
                                <Col md={10}>
                                    <Button bsStyle="success" onClick={() => this.generateGame()} type="button">PLAY</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={6}>
                            {/* Key resets the replay */}
                            <div key={this.state.currentReplayFileBase64}>
                            { this.state.currentReplayFileBase64!=="" ? <Replay containerId="player" number={ 1 } replayFileBase64={ this.state.currentReplayFileBase64 } /> : null }
                            </div>
                        </Col>
                        <Row>
                            {/* Prints out currentLog while also replacing new lines with breaks */}
                            <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                                {this.state.currentLog.split('\n').map(function(item, key) {
                                    return (
                                        <span key={key}>
                                        {item}
                                            <br/>
                                    </span>
                                    )
                                })}.
                                {spinner}
                            </Modal.Body>
                        </Row>
                    </Row>
                </div>
            </div>
        );
    }
}

export default EditorPage;
