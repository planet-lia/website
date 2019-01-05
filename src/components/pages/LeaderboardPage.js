import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Table from '../elems/Table';

import api from '../../utils/api'

class LeaderboardPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      leaderboardData: [],
      loadingData: false,
      error: null
    };
  }

  componentDidMount = () => {
    this.loadLeaderboard();
  }

  loadLeaderboard = async () => {
    this.setState({loadingData: true});
    try {
      const respLeaderboard = await api.game.getLeaderboard();
      this.setLeaderboardData(respLeaderboard.leaderboard)
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setLeaderboardData = (respLeaderboard) => {
    const leaderboard = respLeaderboard.map(
      (leaderboard) => ({
        rank: leaderboard.rank,
        username: leaderboard.user.username,
        userId: leaderboard.user.userId,
        rating: leaderboard.rankDetails.rating,
        tier: leaderboard.user.level,
        organization: leaderboard.user.organization,
        language: leaderboard.bot.language,
        lastChange: this.botVersionFormatter(leaderboard.bot.uploaded),
        version: leaderboard.bot.version
      })
    );
    this.setState({
      leaderboardData: leaderboard,
      loadingData: false
    });
  }

  botVersionFormatter = (uploaded) => {
    return this.timeSince(new Date(uploaded)) + " ago";
  }

  timeSince =(date) => {
    let seconds = Math.floor((new Date() - date) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
  }

  linkFormatter = (cell, row, rowIndex) => {
    return (<Link to={"/user/" + row.userId}>{row.username}</Link>);
  }

  render(){
    const { leaderboardData, loadingData } = this.state;
    const leaderboardColumns = [{
      dataField: 'rank',
			text: 'Rank'
    }, {
      dataField: 'no1',
			text: 'Username',
      formatter: this.linkFormatter
    }, {
      dataField: 'rating',
			text: 'Rating'
    }, {
      dataField: 'tier',
			text: 'Tier'
    }, {
      dataField: 'organization',
      text: 'Organization'
    }, {
      dataField: 'language',
      text: 'Language'
    }, {
      dataField: 'lastChange',
      text: 'Last change'
    }, {
      dataField: 'version',
      text: 'Version'
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
          <h2>Leaderboard</h2>
          <Table data={leaderboardData} columns={leaderboardColumns} keyField="username" loading={loadingData}/>
        </div>

      </div>
    )
  }

}

export default LeaderboardPage;
