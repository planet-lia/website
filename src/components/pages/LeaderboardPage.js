import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import ChallengeButton from '../elems/ChallengeButton';
import InviteButton from '../elems/InviteButton';
import Table from '../elems/Table';
import Sponsors from '../elems/Sponsors';
import { timeSince } from '../../utils/helpers/time';
import Prize from '../elems/Prize';

import api from '../../utils/api';

import {connect} from "react-redux";

class LeaderboardPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      leaderboardData: [],
      loadingData: false,
      lastUpdated: null,
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
      this.setLeaderboardData(respLeaderboard.leaderboard);
      this.setState({lastUpdated: respLeaderboard.leaderboardMisc.updated});
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
        lastChange: timeSince(new Date(leaderboard.bot.uploaded)) + " ago",
        version: leaderboard.bot.version
      })
    );
    this.setState({
      leaderboardData: leaderboard,
      loadingData: false
    });
  }


  linkFormatter = (cell, row, rowIndex) => {
    return (<Link to={"/user/" + row.username} className="no-underline">{row.username}</Link>);
  }


  rankFormatter = (cell, row, rowIndex) => {
    switch (row.rank) {
      case 1: return (<span><FontAwesomeIcon icon="trophy" color={"#D9C72E"}/></span>);
      case 2: return (<span><FontAwesomeIcon icon="trophy" color={"#9B9B92"}/></span>);
      case 3: return (<span><FontAwesomeIcon icon="trophy" color={"#9A3F1B"}/></span>);
      default: return row.rank;
    }
  }

  challengeFormatter = (cell, row, rowIndex) => {
    return <div className="text-center"><ChallengeButton opponent={row.username} opponentId={row.userId} /></div>
  }

  rowClasses = (row, rowIndex) => {
    const {isAuthenticated, username} = this.props;
    if(isAuthenticated && row.username===username) {
      return "custom-table-row";
    } else {
      return "";
    }
  };

  render(){
    const { leaderboardData, loadingData, lastUpdated } = this.state;
    const leaderboardColumns = [{
      dataField: 'no1',
			text: 'Rank',
      formatter: this.rankFormatter
    }, {
      dataField: 'no2',
			text: 'Username',
      formatter: this.linkFormatter
    }, {
      dataField: 'rating',
			text: 'Rating'
    }, {
      dataField: 'no3',
			text: 'Challenge',
      formatter: this.challengeFormatter
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

    const leaderboardUpdatedTextStype = {color: "#FFFFFF"};

    return (
      <div>

        <div className="custom-notification">
          <div className="container text-center">
            Leaderboard is currently in use for <Link to="/tournament">Slovenian Lia tournament 2019</Link>.
          </div>
        </div>
        <div className="container">
          <div className="tour-lb-sponsors text-center">
            <p>Sponsored by</p>
            <Sponsors />
          </div>
          <div className="lead-sec-prize text-center">
            <div className="lead-cont-prize">
              <Prize
                color="#018e6a"
                mainText={"Leaderboard winner week 1"}
                subText={
                  <div>
                    <div>1st ranked player on Sunday February 24<sup>th</sup> at 8:00pm</div>
                    <div>JBL GO bluetooth speaker</div>
                  </div>
                }
              />
            </div>
          </div>
          <Row>
            <Col xs={6}>
              <h2>Leaderboard</h2>
            </Col>
            <Col xs={6}>
              <InviteButton className="btn-invite-lead pull-right"/>
            </Col>
          </Row>
          <Table data={leaderboardData} columns={leaderboardColumns} keyField="username" loading={loadingData} rowClasses = {this.rowClasses}/>
          <Moment format="DD/MM/YYYY HH:mm" style={leaderboardUpdatedTextStype}>{lastUpdated}</Moment>
        </div>

      </div>
    )
  }

}

function mapStateToProps(state) {
  const { isAuthenticated, username } = state.authentication;
  return {
    isAuthenticated,
    username
  };
}

export default connect(mapStateToProps)(LeaderboardPage);
