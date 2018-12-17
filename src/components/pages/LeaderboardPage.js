import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Table from '../elems/Table';
import Popup from '../views/Popup';
import UploadBotForm from '../forms/UploadBotForm';

//import data from '../../assets/LeaderboardData';

class LeaderboardPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      showUploadPopup: false,
    };
  }

  onBotUploadClick = () => {
    this.setState({
      showUploadPopup: true
    });
  }
  onBotUploadClose = () => {
    this.setState({
      showUploadPopup: false
    });
  }

  onBotUpload = () => {
    this.setState({
      showUploadPopup: false
    });
  }

  render(){
    const leaderboardColumns = [{
      dataField: 'rank',
			text: 'Rank'
    }, {
      dataField: 'username',
			text: 'Username'
    }, {
      dataField: 'elo',
			text: 'Elo'
    }, {
      dataField: 'tier',
			text: 'Tier'
    }, {
      dataField: 'organization',
      text: 'Organization'
    }, {
      dataField: 'language',
      text: 'Language'
    }];

    return (
      <div>
        <div className="custom-notification">
          <div className="container text-center">
            Leaderboard is currently in use for <Link to="/tournament">Slovenian Lia turnament 2019</Link>.
          </div>
        </div>
        <div className="container">
          <div className="tour-lb-sponsors text-center">
            <p>Sponsored by</p>
            <Row>
              <Col md={2} mdOffset={1} sm={4} xs={6}>
                <div className="tour-company">Your logo here</div>
              </Col>
              <Col md={2} sm={4} xs={6}>
                <div className="tour-company">Your logo here</div>
              </Col>
              <Col md={2} sm={4} smOffset={0} xs={6} xsOffset={3}>
                <div className="tour-company">Your logo here</div>
              </Col>
              <Col md={2} mdOffset={0} sm={4} smOffset={2} xs={6}>
                <div className="tour-company">Your logo here</div>
              </Col>
              <Col md={2} sm={4} xs={6}>
                <div className="tour-company">Your logo here</div>
              </Col>
            </Row>
          </div>
          <Button id="btn-upload" bsSize="large" onClick={this.onBotUploadClick}>Upload bot</Button>
          <h2>Leaderboard</h2>
          <Table data={[]} columns={leaderboardColumns} keyField="username" />
          <div className="text-center">COMING SOON</div>

          <Popup
            dialogClassName="custom-popup upload-bot"
            show={this.state.showUploadPopup}
            onHide={this.onBotUploadClose}
            onButtonClick={this.onBotUpload}
            heading="Upload Bot"
            buttonText="Upload"
          >
            <UploadBotForm />
          </Popup>
        </div>

      </div>
    )
  }

}

export default LeaderboardPage;
