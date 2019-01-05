import React from 'react';
import { Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <Col md={4}>Copyright {"\u00a9"} Lia 2019</Col>
        <Col md={4}></Col>
        <Col md={4} id="foot-right">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
        </Col>
      </div>
    </div>
  )
}

export default Footer;
