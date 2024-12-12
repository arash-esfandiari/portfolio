import { useState, useRef, useEffect } from "react";
import colorSharp from "../assets/img/color-sharp.png";

// App and respective image imports
import GraphingCalculator from "../apps/GraphingCalc";
import grapgingCalcImg from "../assets/img/appIcons/grapging-calc2.webp";

import PythonIde from "../apps/PythonIde";
import pythonIdeImg from "../assets/img/appIcons/python-ide.webp";

import SprintManager from "../apps/SprintManager";
import sprintManagerImg from "../assets/img/appIcons/sprint-manager.webp";

import ImageConverter from "../apps/ImageConverter";
import ImgConverterImg from "../assets/img/appIcons/img-converter.webp";

import MemoryCardGame from "../apps/MemoryCardGame"
import McGameImg from "../assets/img/appIcons/mc-game1.webp";

import SnakeGame from "../apps/SnakeGame"
import SnakeGamegImg from "../assets/img/appIcons/snake-game2.webp";

import AppstoreImg from '../assets/img/appIcons/apps.webp'
import GamesIcon from '../assets/img/appIcons/games-icon.png'



export const CustomApps = () => {
  const [app, setApp] = useState(null);
  const [currentAppName, setCurrentAppName] = useState("");
  const sliderRef = useRef(null);
  const appContainerRef = useRef(null); // Ref for the app container

  const customApps = [
    { name: "Image Converter", image: ImgConverterImg, component: <ImageConverter /> },
    { name: "The Snake Game", image: SnakeGamegImg, component: <SnakeGame /> },
    { name: "Python IDE", image: pythonIdeImg, component: <PythonIde /> },
    { name: "Memory Card Game", image: McGameImg, component: <MemoryCardGame /> },
    { name: "Graphing Calculator", image: grapgingCalcImg, component: <GraphingCalculator /> },
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

  // Focus or scroll into the app container when an app is opened
  useEffect(() => {
    if (app && appContainerRef.current) {
      appContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      appContainerRef.current.focus();
    }
  }, [app]);

  return (
    <section className="skill" id="apps">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Welcome to my App Store</h2>
              <p>Responsive, practical tools and games created to showcase my coding skills and creativity.</p>
              <div
                className="horizontal-slider"
                ref={sliderRef}
                onWheel={handleScroll} // Enable horizontal scrolling with trackpad or mouse wheel
              >
                {customApps.map((appItem, index) => (
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
        <div ref={appContainerRef} tabIndex="-1" /* Allows focus */
          className="app-container">
          <button
            className="close-button"
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