import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png";
import grapgingCalcImg from "../assets/img/extApps/graphing-calc.webp";
import pythonIdeImg from "../assets/img/extApps/python-ide.webp";
import sprintManagerImg from "../assets/img/extApps/sprint-manager.webp";

import GraphingCalculator from '../apps/GraphingCalc';
import PythonIde from '../apps/PythonIde';
import SprintManager from '../apps/SprintManager';

import { useState } from "react";

export const FunApps = () => {
  const [app, setApp] = useState(null); // Store the selected app
  const [currentAppName, setCurrentAppName] = useState(""); // Track the name of the current app

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const styles = {
    linkStyles: {
      textDecoration: 'none',
      color: 'inherit',
      cursor: 'pointer',
    },
    imgStyles: {
      width: '160px',
      height: '100px',
      objectFit: 'cover',
      borderRadius: '10px',
    },
    closeButton: {
      position: "absolute",
      top: "10px",
      left: "10px",
      backgroundColor: "transparent",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      padding: "5px 10px",
      zIndex: 1000,
    },
    appContainer: {
      position: "relative",
      marginTop: "20px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    },
  };

  const handleAppClick = (appName, component) => {
    if (currentAppName === appName) {
      // Close the app if it's already selected
      setApp(null);
      setCurrentAppName("");
    } else {
      // Open the selected app
      setApp(component);
      setCurrentAppName(appName);
    }
  };

  const handleCloseApp = () => {
    setApp(null);
    setCurrentAppName("");
  };

  const extApps = [
    {
      name: "Graphing Calculator",
      image: grapgingCalcImg,
      component: <GraphingCalculator />,
    },
    {
      name: "Python IDE",
      image: pythonIdeImg,
      component: <PythonIde />,
    },
    {
      name: "Simple Sprint Manager",
      image: sprintManagerImg,
      component: <SprintManager />,
    },
  ];

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Play around with my Apps</h2>
              <p>Useful tools and fun apps created in under 2 hours.</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                {extApps.map((appItem, index) => (
                  <div
                    className="item"
                    key={index}
                    onClick={() => handleAppClick(appItem.name, appItem.component)}
                    style={styles.linkStyles}
                  >
                    <img src={appItem.image} alt={appItem.name} style={styles.imgStyles} />
                    <h5>{appItem.name}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
      {app && (
        <div style={styles.appContainer}>
          <button style={styles.closeButton} onClick={handleCloseApp}>
            X
          </button>
          {app}
        </div>
      )}
    </section>
  );
};