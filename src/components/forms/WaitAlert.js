import React from 'react';

const WaitAlert = (props) => {
  return (
    <div>
      <p>
        You have to wait 15 seconds before you can play a new game.
      </p>
      <p>
        {props.wait + " seconds remaining."}
      </p>
    </div>
  )
}

export default WaitAlert;
