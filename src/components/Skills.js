import meter1 from "../assets/img/meter1.svg";
import meter2 from "../assets/img/meter2.svg";
import meter3 from "../assets/img/meter3.svg";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import colorSharp from "../assets/img/color-sharp.png"

export const Skills = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="skill" id="skills">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="skill-bx wow zoomIn">
              <h2>Priority</h2>
              <p>A developer is considered to be of high quality based on certain aspects which can differ in the eyes of each person.<br></br> As a software engineer, I prioritize the following aspects to hold the highest value:</p>
              <Carousel responsive={responsive} infinite={true} className="owl-carousel owl-theme skill-slider">
                <div className="item">
                  <img src={meter1} alt="95%" />
                  <h5>Neat Code</h5>
                </div>
                <div className="item">
                  <img src={meter1} alt="95%" />
                  <h5>Team Communication</h5>
                </div>
                <div className="item">
                  <img src={meter3} alt="90%" />
                  <h5>Clear Comments</h5>
                </div>
                <div className="item">
                  <img src={meter3} alt="90%" />
                  <h5>Readable Code</h5>
                </div>
                <div className="item">
                  <img src={meter2} alt="80%" />
                  <h5>Documentation</h5>
                </div>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="95%" />
    </section>
  )
}
