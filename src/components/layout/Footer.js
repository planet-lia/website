import React from 'react';
import { Col } from 'react-bootstrap';
import Link from "react-router-dom/es/Link";

const Footer = () => {
  return (
    <div id="footer">
      <div className="container">
        <Col md={4}>Copyright {"\u00a9"} Lia 2019</Col>
        <Col md={4}></Col>
        <Col md={4} id="foot-right">
          <span>
            <Link to={"/privacy-policy"} target={"_blank"} style={{ textDecoration: 'none' }}>Privacy Policy</Link>
          </span>
          <span>
            <Link to={"/terms-and-conditions"} target={"_blank"} style={{ textDecoration: 'none' }}>Terms and Conditions</Link>
        </span>
        </Col>
      </div>
    </div>
  )
}

export default Footer;
