import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

const ChallengeButton = (props) => {
  return(
    <a
      role="button"
      className="no-underline"
      onClick={() => showPopup(props.opponent, props.opponentId)}
    >
      <FontAwesomeIcon icon="chess-rook" />
      {!props.icon ? " Challenge" : null}
    </a>
  )

  async function showPopup(opponent, opponentId) {
    await props.dispatch(popupsActions.showChallenge(opponent, opponentId))
  }

}

export default connect()(ChallengeButton);
