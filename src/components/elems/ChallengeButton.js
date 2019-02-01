import React from 'react';

import { connect } from 'react-redux';
import { popupsActions } from '../../utils/actions/popupsActions';

const ChallengeButton = (props) => {
  return(
    <a
      role="button"
      className="no-underline"
      onClick={() => showPopup(props.opponent, props.opponentId)}
    >
      Challenge
    </a>
  )

  async function showPopup(opponent, opponentId) {
    await props.dispatch(popupsActions.showChallenge(opponent, opponentId))
  }

}

export default connect()(ChallengeButton);
