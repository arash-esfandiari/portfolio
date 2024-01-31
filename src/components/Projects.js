import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import arashshopImg from "../assets/img/arashshop.png";
import arashflixImg from "../assets/img/arashflix.webp";
import uberloneImg from '../assets/img/uberlone.jpeg'
import awsImg from "../assets/img/aws-cert.png";
import gameImg from "../assets/img/game.png";
import threadImg from "../assets/img/thread.jpg";
import guelphImg from "../assets/img/guelph.webp";
import businessImg from '../assets/img/business.webp'
import softengImg from '../assets/img/softeng.jpeg'
import cryptoImg from "../assets/img/cryptography.webp";
import colorSharp2 from "../assets/img/color-sharp2.png";
import reactImg from '../assets/img/React-icon.png'
import azureImg from '../assets/img/azure_logo.png'
import cImg from '../assets/img/c_logo.png'
import djangoImg from '../assets/img/django_logo.png'
import gcpImg from '../assets/img/gcp_logo.png'
import hibernateImg from '../assets/img/hibernate_logo.png'
import javaImg from '../assets/img/java_logo.png'
import javascriptImg from '../assets/img/javascript_logo.png'
import nodeImg from '../assets/img/nodejs_logo.png'
import pythonImg from '../assets/img/python_logo.png'
import reduxImg from '../assets/img/redux_logo.svg'
import springImg from '../assets/img/spring_logo.png'
import reactnativeLogo from '../assets/img/reactnative_logo.png'
import goImg from '../assets/img/GoLogo.svg'


import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {

  const education = [
    {
      title: "University of Guelph",
      imgUrl: guelphImg,
    },
    {
      title: "Software Engineering Major",
      description: "University of Guelph",
      imgUrl: softengImg,
    },
    {
      title: "Business Minor",
      description: "University of Guelph",
      imgUrl: businessImg,
    },
  ];

  const projects = [
    {
      title: "Django E-Commerce",
      description: "Django, React, Redux, S3, Heroku, PostgreSQL",
      imgUrl: arashshopImg,
      link: "https://arashshop-django-d2eba5cc85a0.herokuapp.com/",
    },
    {
      title: "Arashflix",
      description: "React, Firebase, TMDB Live Database",
      imgUrl: arashflixImg,
      link: "https://arashflix.web.app/",
    },
    {
      title: "Uberlone",
      description: "React Native, Redux, Google Maps API",
      imgUrl: uberloneImg,
      link: "https://github.com/arash-esfandiari/uberlone",
    },
  ];
  const skills = [
    {
      title: "AWS Certified Cloud Practitioner",
      description: "Cloud Architecture, Storages, Databases",
      imgUrl: awsImg,
    },
    {
      title: "Crypotography",
      description: "Network Security, Public/Private Keys, Security Algorithms",
      imgUrl: cryptoImg,
    },
    {
      title: "Parallel Programming",
      description: "C, OpenGL, OpenCL, Multi-Threading",
      imgUrl: threadImg,
    },
    {
      title: "Game Programming",
      description: "C, OpenGL, 3D Game Design, AI enemies",
      imgUrl: gameImg,
    },
    {
      title: "C",
      imgUrl: cImg,
    },
    {
      title: "React",
      imgUrl: reactImg,
    },
    {
      title: "React Native",
      imgUrl: reactnativeLogo,
    },
    {
      title: "Node.js",
      imgUrl: nodeImg,
    },
    {
      title: "JavaScript",
      imgUrl: javascriptImg,
    },
    {
      title: "Django",
      imgUrl: djangoImg,
    },
    {
      title: "Redux",
      imgUrl: reduxImg,
    },
    {
      title: "Python",
      imgUrl: pythonImg,
    },
    {
      title: "Azure",
      imgUrl: azureImg,
    },
    {
      title: "GCP",
      imgUrl: gcpImg,
    },
    {
      title: "Java",
      imgUrl: javaImg,
    },
    {
      title: "Spring",
      imgUrl: springImg,
    },
    {
      title: "Hibernate",
      imgUrl: hibernateImg,
    },
    {
      title: "Go",
      imgUrl: goImg,
    },
  ];

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Relevant Skills</h2>
                  <p>A brief history about my professional life.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills mb-5 justify-content-center align-items-center" id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Education 📚</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Projects 💻</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Skills 🍳</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
                          <Row>
                            {
                              education.map((educ, index) => {
                                return (
                                  <ProjectCard
                                    key={index}
                                    {...educ}
                                  />
                                )
                              })
                            }
                          </Row>
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <Row>
                          {
                            projects.map((project, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...project}
                                />
                              )
                            })
                          }
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <Row>
                          {
                            skills.map((skill, index) => {
                              return (
                                <ProjectCard
                                  key={index}
                                  {...skill}
                                />
                              )
                            })
                          }
                        </Row> </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} alt="bck-img"></img>
    </section>
  )
}
