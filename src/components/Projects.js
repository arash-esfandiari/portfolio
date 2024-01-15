import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import arashshopImg from "../assets/img/arashshop.png";
import arashflixImg from "../assets/img/arashflix.webp";
import awsImg from "../assets/img/aws-cert.png";
import gameImg from "../assets/img/game.png";
import threadImg from "../assets/img/thread.jpg";
import guelphImg from "../assets/img/guelph.webp";
import businessImg from '../assets/img/business.jpeg'
import codeImg from '../assets/img/code.png'
import cryptoImg from "../assets/img/cryptography.webp";
import colorSharp2 from "../assets/img/color-sharp2.png";
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
      imgUrl: codeImg,
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
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
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
