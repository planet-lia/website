import React, { Component } from 'react';

import api from '../../utils/api';

class SubmitCodeText extends Component {
  constructor(props){
    super(props);
    this.state = {
      msg: "",
      loading: true,
      error: null
    }
  }

  componentDidMount = () => {
    this.loadBotData();
  }

  loadBotData = async () => {
    let activeBotId = null;
    let latestBotStatus =  null;

    try{
      const respBotActive = await api.game.getActiveBot();
      activeBotId = respBotActive.bot.botId;
      try {
        const respBotLatest = await api.game.getLatestBot();
        latestBotStatus = respBotLatest.bot.status
      } catch (err) {
        //do nothing
      }
      this.setState({
        loading: false
      })
    }
    catch(err) {
      if(err.response){
        this.setState({ loading: false })
      } else {
        this.setState({
          loading: false,
          error: "Network Error"
        });
        console.log(err.message);
      }
    }

    this.popupMsgText(activeBotId, latestBotStatus)
  }

  popupMsgText = (activeBotId, latestBotStatus) => {
    const { setIsBotProcessing } = this.props;

    if (activeBotId && this.state.error===null) {
      if (latestBotStatus && (latestBotStatus==="processing" || latestBotStatus==="testing")) {
        setIsBotProcessing(true);
        this.setState({msg: "Your latest bot is still processing."})
      }
      setIsBotProcessing(false);
      this.setState({msg: "Submitting your code will override your current bot."})
    }
    setIsBotProcessing(false);
    this.setState({msg: "Click submit to upload your first bot."})
  }

  render() {
    if (this.state.error) {
      return (<p className="text-danger resp-msg">{this.state.error}</p>)
    }
    return (<div><p>{this.state.msg}</p></div>)
  }

}

export default SubmitCodeText;
