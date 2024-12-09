import { useState, useRef } from "react";
import colorSharp from "../assets/img/color-sharp.png";

// App and respective image imports
import GraphingCalculator from "../apps/GraphingCalc";
import grapgingCalcImg from "../assets/img/extApps/graphing-calc.webp";

import PythonIde from "../apps/PythonIde";
import pythonIdeImg from "../assets/img/extApps/python-ide.webp";

import SprintManager from "../apps/SprintManager";
import sprintManagerImg from "../assets/img/extApps/sprint-manager.webp";

import ImageConverter from "../apps/ImageConverter";
import ImgConverterImg from "../assets/img/extApps/img-converter.webp";

export const CustomApps = () => {
  const [app, setApp] = useState(null);
  const [currentAppName, setCurrentAppName] = useState("");
  const sliderRef = useRef(null);

  const extApps = [
    { name: "Image Converter", image: ImgConverterImg, component: <ImageConverter /> },
    { name: "Graphing Calculator", image: grapgingCalcImg, component: <GraphingCalculator /> },
    { name: "Python IDE", image: pythonIdeImg, component: <PythonIde /> },
    { name: "Simple Sprint Manager", image: sprintManagerImg, component: <SprintManager /> }
  ];

  const handleAppClick = (appName, component) => {
    if (currentAppName === appName) {
      setApp(null);
      setCurrentAppName("");
    } else {
      setApp(component);
      setCurrentAppName(appName);
    }
  };

  const handleCloseApp = () => {
    setApp(null);
    setCurrentAppName("");
  };

  const handleScroll = (e) => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += e.deltaY * 1.5; // Adjust scroll speed
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Try Out My Handy Custom Apps</h2>
              <p>Responsive, practical tools created to showcase my coding skills and creativity.</p>
              <div
                className="horizontal-slider"
                ref={sliderRef}
                onWheel={handleScroll} // Enable horizontal scrolling with trackpad or mouse wheel
              >
                {extApps.map((appItem, index) => (
                  <div
                    className="item"
                    key={index}
                    onClick={() => handleAppClick(appItem.name, appItem.component)}
                  >
                    <img src={appItem.image} alt={appItem.name} />
                    <h5>{appItem.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
      {app && (
        <div style={{ position: "relative", marginTop: "20px", padding: "10px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
          <button
            style={{
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
            }}
            onClick={handleCloseApp}
          >
            X
          </button>
          {app}
        </div>
      )}
    </section>
  );
};