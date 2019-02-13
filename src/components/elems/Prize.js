import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Prize = (props) => {
  return(
    <div className="tour-cont-prize">
      <div className="tour-cont-icon-sm tour-prize-icon">
        <FontAwesomeIcon icon="trophy" style={{color: props.color}}/>
      </div>
      <div>
        <div className="tour-prize-text">{props.mainText}</div>
        <div className="tour-prize-subtext">{props.subText}</div>
        {props.sponsor
          ? <div className="tour-prize-subtext">{props.sponsor}</div>
          : null
        }
      </div>
    </div>
  )
}

export default Prize;
