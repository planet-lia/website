import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class UploadBotForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      fileName: "No file selected.",
      files: []
    }
  }

  onUploadBotChange = (event) => {
    console.log(event.target.files);
    if(event.target.files.length===1){
      this.setState({fileName: event.target.files[0].name});
    }
  }

  onDrop(files) {
    console.log(files);
    this.setState({
      files
    });
  }

  render() {
    return (
      <div id="cont-upload-bot">
        <section>
        <div>
          <Dropzone className="dropzone" accept=".zip" disablePreview onDrop={this.onDrop.bind(this)}>
            <p>Drag and drop your bot ZIP file or click to browse</p>
          </Dropzone>
        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
      </div>
    )
  }

}

export default UploadBotForm;
