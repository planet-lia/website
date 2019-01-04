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
        rating: leaderboard.rankDetails.rating,
        tier: leaderboard.user.level,
        organization: leaderboard.user.organization,
        language: leaderboard.bot.language
      })
    );
    this.setState({
      leaderboardData: leaderboard,
      loadingData: false
    });
  }

  render(){
    const { leaderboardData, loadingData } = this.state;
    const leaderboardColumns = [{
      dataField: 'rank',
			text: 'Rank'
    }, {
      dataField: 'username',
			text: 'Username'
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
