import React from 'react';
import { Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

const ChallengeButton = (props) => {
  return(
    <Button
      className={"btn custom-btn " + props.className}
      onClick={() => showPopup(props.opponent, props.opponentId)}
    >
      <span><FontAwesomeIcon icon="chess-rook" /></span>
      {" Challenge"}
    </Button>
  )

  async function showPopup(opponent, opponentId) {
    await props.dispatch(popupsActions.showChallenge(opponent, opponentId))
  }

}

export default connect()(ChallengeButton);
