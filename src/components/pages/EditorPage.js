import React, { Component } from 'react';

import MonacoEditor from 'react-monaco-editor';

class EditorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            code: '',
            lang: 'python',
        };

        this.changeEditorValue("python3")
    }
    editorDidMount(editor, monaco) {
        console.log('editorDidMount', editor);
        editor.focus();

    }
    onChange(newValue, e) {
        console.log('onChange', newValue, e);
    }

    changeEditorValue = (lang) => {
        let url = "";
        if (lang === "python3") {
            url = "https://raw.githubusercontent.com/liagame/python3-bot/v0.2.0/my_bot.py";
            this.setState({ lang: "python3" });
        } else if (lang === "java") {
            url = "https://raw.githubusercontent.com/liagame/java-bot/v0.2.0/src/MyBot.java";
            this.setState({ lang: lang });
        } else if (lang === "kotlin") {
            url = "https://raw.githubusercontent.com/liagame/kotlin-bot/v0.2.0/src/MyBot.kt";
            this.setState({ lang: "java" });
        }

        fetch(url)
            .then((resp)=>{ return resp.text() })
            .then((text)=>{
                this.setState({ code: text });
            });
    };

    generateGame = () => {
        fetch('https://editor.cloud1.liagame.com/generate', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                language: this.state.lang,
                code:     this.state.code
            })})
            .then((resp)=>{ return resp.text() })
            .then((text)=>{
                console.log(text);
            })
    };


    render() {
        const code = this.state.code;
        const lang = this.state.lang;

        const options = {
            selectOnLineNumbers: true,
            fontSize: 12,
            scrollBeyondLastLine: false
        };
        return (
            <div>
                <MonacoEditor
                    width="50%"
                    height="800"
                    language={lang}
                    theme="vs-dark"
                    value={code}
                    options={options}
                    onChange={this.onChange}
                    editorDidMount={this.editorDidMount}
                />
                <button onClick={() => this.changeEditorValue("python3")} type="button">Python3</button>
                <button onClick={() => this.changeEditorValue("java")} type="button">java</button>
                <button onClick={() => this.changeEditorValue("kotlin")} type="button">Kotlin</button>
                <button onClick={() => this.generateGame()} type="button">PLAY</button>
            </div>
        );
    }
}

export default EditorPage;
