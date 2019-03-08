import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Replay from '../elems/Replay';

const BattleTest = () => {
  return (
    <div>
      <Row>
        <Col md={6}>
          <Replay
            containerId="gameView1"
            replayFileBase64=""
            number={0}
            replayUrl={"https://storage.staging2.cloud1.liagame.com/replays/efb1c152-eb34-4a33-a41f-0f9b43639bd7.lia"}
          />
        </Col>
        <Col md={6}>
          <Replay
            containerId="gameView2"
            replayFileBase64=""
            number={0}
            replayUrl={"https://storage.staging2.cloud1.liagame.com/replays/74616070-6fa0-4bfd-89bd-b1aa6a74a3dd.lia"}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Replay
            containerId="gameView3"
            replayFileBase64=""
            number={0}
            replayUrl={"https://storage.staging2.cloud1.liagame.com/replays/c7d37279-9204-46cf-a14f-278572a7cf9e.lia"}
          />
        </Col>
        <Col md={6}>
          <Replay
            containerId="gameView4"
            replayFileBase64=""
            number={0}
            replayUrl={"https://storage.staging2.cloud1.liagame.com/replays/0b21d9a5-7c51-4b5e-a8e5-dea48d15a61a.lia"}
          />
        </Col>
      </Row>
    </div>
  )
}

export default BattleTest;
