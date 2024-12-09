import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/logo.png";
import navIcon1 from "../assets/img/nav-icon1.svg";


export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col lg={12}>
            <div className="newsletter-bx wow slideInUp">
              <Row>
                <h3>Thank you for taking the time to review my portfolio. <br />If you have any questions or would like to discuss further opportunities, please feel free to get in touch. </h3>
              </Row>
            </div>
          </Col>
          <Col size={12} sm={6}>
            <img style={{ width: '20vw' }} src={logo} alt="Logo" />
          </Col>
          <Col size={12} sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/arash-esfandiari-316b8714b/" target="_blank" rel="noreferrer"><img src={navIcon1} alt="LinkedIn Icon" /></a>
              {/* <a href="#"><img src={navIcon2} alt="Icon" /></a>
              <a href="#"><img src={navIcon3} alt="Icon" /></a> */}
            </div>
            <p>Copyright 2023. All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
