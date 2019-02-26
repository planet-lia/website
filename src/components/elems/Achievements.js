import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Achievements = (props) => {
  if(props.data.length===0){
    return null;
  }

  let achiDisplay = [];
  props.data.forEach((item, index) => {
    achiDisplay.push(
      <div key={index}>
        <span className="achi-icon"><FontAwesomeIcon icon="award" color={"#" + item.color}/></span>
        <span>{item.achievement}</span>
      </div>
    )
  })

  return (
    <div className={props.className}>
      {achiDisplay}
    </div>
  )
}

export default Achievements;
