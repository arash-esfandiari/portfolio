import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const toRotate = ["Software Engineer.", "AI Master's Student.", "Full-Stack Developer."];
  const period = 1000;

  // Check screen size and update state
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust threshold for small screens
    };
    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isSmallScreen) {
      let ticker = setInterval(() => {
        tick();
      }, delta);
      return () => clearInterval(ticker);
    }
  }, [text, isSmallScreen]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(200);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              <div className="animate__animated animate__fadeIn">
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>
                  {`Hi! I'm Arash.`}
                  <br />
                  {isSmallScreen ? (
                    <span>I'm a Software Engineer.</span>
                  ) : (
                    <span className="txt-rotate">
                      <span className="wrap">{text}</span>
                    </span>
                  )}
                </h1>
                <p>Wandering through the vast universe, driven to make a meaningful impact.</p>
                <p>Software Engineer at Scale AI, pursuing a Master’s in Artificial Intelligence.</p>
                <button onClick={() => document.getElementById("connect").scrollIntoView()}>
                  Let’s Connect <ArrowRightCircle size={25} />
                </button>
              </div>
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <div>
              <img src={headerImg} alt="Header Img" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};