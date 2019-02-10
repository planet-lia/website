import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Moment from 'react-moment';

import Table from '../elems/Table';
import Sponsors from '../elems/Sponsors';
import { timeSince } from '../../utils/helpers/time';

import api from '../../utils/api'

class LeaderboardPage extends Component {
  constructor(props){
		super(props);
    this.state = {
      leaderboardData: [],
      loadingData: false,
      lastUpdated: "",
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
    return (<Link to={"/user/" + row.username} style={{ textDecoration: 'none' }}>{row.username}</Link>);
  }


  rankFormatter = (cell, row, rowIndex) => {
    switch (row.rank) {
      case 1: return (<span><FontAwesomeIcon icon="trophy" color={"#D9C72E"}/></span>);
      case 2: return (<span><FontAwesomeIcon icon="trophy" color={"#9B9B92"}/></span>);
      case 3: return (<span><FontAwesomeIcon icon="trophy" color={"#9A3F1B"}/></span>);
      default: return row.rank;
    }
  }

  render(){
    const { leaderboardData, loadingData, lastUpdated } = this.state;
    const leaderboardColumns = [{
      dataField: 'rank',
			text: 'Rank',
      formatter: this.rankFormatter
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
          <h2>Leaderboard</h2>
          {/* TODO sorry for that ugly hack, put it in CSS. :) */}
          <span>&nbsp;&nbsp;</span>
          <Table data={leaderboardData} columns={leaderboardColumns} keyField="username" loading={loadingData}/>
          <div className="text-center">COMING SOON</div>
          <Moment format="DD/MM/YYYY HH:mm" style={leaderboardUpdatedTextStype}>{lastUpdated}</Moment>
        </div>

      </div>
    )
  }

}

export default LeaderboardPage;
