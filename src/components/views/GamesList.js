import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import GamesTable from '../elems/GamesTable';

import api from '../../utils/api';

class GamesList extends Component {
  constructor(props){
		super(props);
    this.state = {
      gamesData: [],
      loadingData: false,
      pageCount: 0,
      nGamesPerPage: 0,
      error: null
    };
  }

  componentDidMount = () => {
    this.loadGames(0);
  }

  loadGames = async (offset) => {
    this.setState({loadingData: true});
    try {
      const respGames = await api.game.getGamesList(offset);
      this.setGamesData(respGames)
    } catch(err) {
      this.setState({
        loadingData: false,
        error: "Network Error"
      });
      console.log(err.message);
    }
  }

  setGamesData = (respGames) => {
    const gamesList = respGames.matches.map(
      (gamesList) => ({
        matchId: gamesList.matchId,
        replayUrl: gamesList.replayUrl,
        date: gamesList.completed,
        player1: gamesList.bots[0].user.username,
        player2: gamesList.bots[1].user.username,
        result: (gamesList.bots[0].isWinner ? 1 : 2),
        duration: gamesList.duration,
        unitsRemain1: Math.max(gamesList.bots[0].unitsLeft, 0),
        unitsRemain2: Math.max(gamesList.bots[1].unitsLeft, 0)
      })
    );
    let pageCount = this.state.pageCount;
    if (pageCount === 0) {
      pageCount = Math.ceil(respGames.pagination.total / respGames.pagination.count)
    }

    this.setState({
      gamesData: gamesList,
      nGamesPerPage: respGames.pagination.count,
      pageCount: pageCount,
      loadingData: false
    });
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    console.log(this.state.nGamesPerPage)
    let offset = Math.ceil(selected * this.state.nGamesPerPage);

    this.loadGames(offset);
  };

  render(){
    const { gamesData, loadingData, pageCount } = this.state;

    return (
      <div>
        <h2>Games</h2>
        <p>To watch a game click the date.</p>
        <GamesTable data={gamesData} loading={loadingData}/>
        <ReactPaginate previousLabel={"<"}
                       nextLabel={">"}
                       breakLabel={"..."}
                       breakClassName={"break-me"}
                       pageCount={pageCount}
                       marginPagesDisplayed={1}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    )
  }

}

export default GamesList;
