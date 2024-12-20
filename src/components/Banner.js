import { useState, useEffect } from "react";
import "../styles/components/Banner.css";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/header-img.svg";
import { ArrowRightCircle } from 'react-bootstrap-icons';
import 'animate.css';

export const Banner = () => {
  // State to track which text in the array is being displayed
  const [loopNum, setLoopNum] = useState(0);
  // State to track if the animation is currently deleting characters
  const [isDeleting, setIsDeleting] = useState(false);
  // State to store the currently displayed substring of the text
  const [text, setText] = useState('');
  // State to control typing speed, starts with a random value
  const [delta, setDelta] = useState(200 - Math.random() * 100);
  // State to track the current character index (not critical here)
  const [index, setIndex] = useState(1);
  // State to determine if the screen size is small
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Array of strings to rotate in the animation
  // Replaceable with the actual desired values
  const toRotate = ["n.", "y.", "m."];
  const period = 1000; // Pause duration after typing a full string

  // Hook to check and update screen size
  useEffect(() => {
    const handleResize = () => {
      // Set small screen state based on window width
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize(); // Call initially to set the state correctly
    window.addEventListener("resize", handleResize); // Listen for screen resizing
    return () => window.removeEventListener("resize", handleResize); // Cleanup on unmount
  }, []);

  // Hook to handle the typing animation
  useEffect(() => {
    // Set an interval to call the tick function at regular intervals
    let ticker = setInterval(() => {
      tick();
    }, delta); // Interval duration based on `delta`

    // Clear the interval when dependencies change
    return () => clearInterval(ticker);
  }, [text, isSmallScreen]); // Rerun when `text` or screen size changes

  // Function to handle typing and deleting animation logic
  const tick = () => {
    let i = loopNum % toRotate.length; // Get the current string index
    let fullText = toRotate[i]; // Retrieve the full string to display

    // Update the text: add or remove a character based on `isDeleting`
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1) // Remove a character when deleting
      : fullText.substring(0, text.length + 1); // Add a character when typing

    setText(updatedText); // Update the displayed text

    // If deleting, reduce the typing speed
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    // If the full string is typed out
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true); // Start deleting
      setDelta(period); // Pause before deleting
    }
    // If deleting and the text is fully removed
    else if (isDeleting && updatedText === '') {
      setIsDeleting(false); // Start typing the next string
      setLoopNum(loopNum + 1); // Move to the next string in the array
      setDelta(200); // Reset typing speed
    }
    // Increment index for other cases
    else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <div className="animate__animated animate__fadeIn">
              <span className="tagline">Welcome to my Portfolio</span>
              <h1>
                {`Hi! I'm Arash.`}
                <br />
                {/* Animated text rotation */}
                <span className="txt-rotate">
                  <span>I write bugs… and occasionally fix the</span>
                  <span className="wrap">{text}</span>
                </span>
              </h1>
              {/* Description */}
              <p>Wandering through the vast universe, driven to make a meaningful impact.</p>
              <p>Software Engineer at Scale AI, pursuing a Master’s in Artificial Intelligence.</p>
              {/* Button to scroll to the "connect" section */}
              <button onClick={() => document.getElementById("connect").scrollIntoView()}>
                Let’s Connect <ArrowRightCircle size={25} />
              </button>
            </div>
          </Col>
          {/* Image column */}
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