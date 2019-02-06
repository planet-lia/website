import React from 'react';
import { Row, Col } from 'react-bootstrap';

import logoStyliff from '../../assets/logo_styliff.png';
import logoLoop from '../../assets/logo_loop.svg';
import logoAgilcon from '../../assets/logo_agilcon.png';
import logoSensum from '../../assets/logo_sensum.png';
import logoMedius from '../../assets/logo_medius.png';
import logoOutfit7 from '../../assets/logo_outfit7.png';

const Sponsors = () => {
  return (
    <div>
      <Row>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://styliff.com/" target="_blank" rel="noopener noreferrer">
              <img id="logo-styliff" className="tour-company" src={ logoStyliff } alt="Styliff tech" />
            </a>
          </div>
        </Col>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://www.intheloop.io/" target="_blank" rel="noopener noreferrer">
              <img id="logo-loop" className="tour-company" src={ logoLoop } alt="Loop" />
            </a>
          </div>
        </Col>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://www.agilcon.com/sl/zaposlitev/" target="_blank" rel="noopener noreferrer">
              <img id="logo-agilcon" className="tour-company" src={ logoAgilcon } alt="Agilcon" />
            </a>
          </div>
        </Col>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://www.sensum.eu/" target="_blank" rel="noopener noreferrer">
              <img id="logo-sensum" className="tour-company" src={ logoSensum } alt="Sensum" />
            </a>
          </div>
        </Col>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://www.medius.si/" target="_blank" rel="noopener noreferrer">
              <img id="logo-medius" className="tour-company" src={ logoMedius } alt="Medius" />
            </a>
          </div>
        </Col>
        <Col md={2} sm={4} xs={6}>
          <div>
            <a href="https://outfit7.com/" target="_blank" rel="noopener noreferrer">
              <img id="logo-outfit7" className="tour-company" src={ logoOutfit7 } alt="Outfit7" />
            </a>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Sponsors;
