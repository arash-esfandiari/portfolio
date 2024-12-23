import { useState, useRef, useEffect } from "react";
import "../styles/components/AppStore.css"

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



export const AppStore = () => {
  const [app, setApp] = useState(null);
  const [currentAppName, setCurrentAppName] = useState("");
  const appContainerRef = useRef(null); // Ref for the app container
  const activeAppItemRef = useRef(null); // Ref for the currently clicked app item

  const customApps = [
    { name: "Image Converter", image: ImgConverterImg, component: <ImageConverter /> },
    { name: "The Snake Game", image: SnakeGamegImg, component: <SnakeGame /> },
    { name: "Python IDE", image: pythonIdeImg, component: <PythonIde /> },
    { name: "Memory Card Game", image: McGameImg, component: <MemoryCardGame /> },
    { name: "Graphing Calculator", image: grapgingCalcImg, component: <GraphingCalculator /> },
    { name: "Simple Sprint Manager", image: sprintManagerImg, component: <SprintManager /> }
  ];


  const handleAppClick = (appName, component, appItemRef) => {
    if (currentAppName === appName) {
      setApp(null);
      setCurrentAppName("");
    } else {
      setApp(component);
      setCurrentAppName(appName);

      // Focus the clicked app item
      if (appItemRef) {
        appItemRef.focus();
      }
    }
  };

  const handleCloseApp = () => {
    setApp(null);
    setCurrentAppName("");
  };

  // const handleScroll = (e) => {
  //   if (sliderRef.current) {
  //     sliderRef.current.scrollLeft += e.deltaY * 1.5; // Adjust scroll speed
  //   }
  // };

  const handleMaximizeApp = () => {
    if (appContainerRef.current) {
      appContainerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      appContainerRef.current.focus(); // Focus the app container
    }
  };

  // Focus or scroll into the app container when an app is opened
  useEffect(() => {
    handleMaximizeApp();
  }, [app]);


  return (
    <section id="app-store">
      <div className="container">
        <div className="appstore-bx">
          <h2>App Store</h2>
          <p>Welcome to my AppStore. Stay tuned for weekly apps and games...</p>
          <div className="appstore-grid">
            {customApps.map((appItem, index) => (
              <div
                className={`app-item ${currentAppName === appItem.name ? "selected" : ""}`}
                key={index}
                tabIndex="0" // Make focusable
                onClick={(e) => handleAppClick(appItem.name, appItem.component, e.currentTarget)}
              >
                <img src={appItem.image} alt={appItem.name} />
                <h5>{appItem.name}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Background" />
      {app && (
        <div>
          {/* Invisible spacer for focus */}
          <div
            ref={appContainerRef}
            style={{ height: "5px", outline: "none" }}
          ></div>
          <div className="app-container">
            <div className="macos-titlebar">
              <div className="macos-buttons">
                <button
                  className="macos-button macos-close-button"
                  onClick={handleCloseApp}
                  title="Close"
                >
                  <span></span>
                </button>
                <button
                  className="macos-button macos-minimize-button"
                  onClick={handleCloseApp}
                  title="Minimize"
                >
                  <span></span>
                </button>
                <button
                  className="macos-button macos-maximize-button"
                  onClick={handleMaximizeApp}
                  title="Maximize"
                >
                  <span></span>
                </button>
              </div>
            </div>
            {app}
          </div>
        </div>
      )}
    </section>
  );
};