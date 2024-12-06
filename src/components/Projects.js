import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
// Design Images
import colorSharp2 from "../assets/img/color-sharp2.png";
// Projects Images
import arashshopImg from "../assets/img/projects/arashshop.png";
import arashflixImg from "../assets/img/projects/arashflix.webp";
import uberloneImg from '../assets/img/projects/uberlone.jpeg'
import gameImg from "../assets/img/projects/game.png";
import k8Img from '../assets/img/projects/k8.png'
import blockchainImg from '../assets/img/projects/blockchain.webp'
// Education Images
import guelphImg from "../assets/img/education/guelph.webp";
import softengImg from '../assets/img/education/softwareEng.webp'
import businessImg from '../assets/img/education/money.png'
// Skils Images
import awsImg from "../assets/img/skills/aws-cert.png";
import parallelProgImg from "../assets/img/skills/parallel-prog.webp";
import cryptoImg from "../assets/img/skills/crypto.png";
import reactImg from '../assets/img/skills/React-icon.png'
import azureImg from '../assets/img/skills/azure_logo.png'
import cImg from '../assets/img/skills/c_logo.png'
import djangoImg from '../assets/img/skills/django_logo.webp'
import gcpImg from '../assets/img/skills/gcp_logo.png'
import hibernateImg from '../assets/img/skills/hibernate_logo.png'
import javaImg from '../assets/img/skills/java_logo.png'
import javascriptImg from '../assets/img/skills/javascript_logo.png'
import nodeImg from '../assets/img/skills/nodejs_logo.png'
import pythonImg from '../assets/img/skills/python_logo.png'
import reduxImg from '../assets/img/skills/redux_logo.svg'
import springImg from '../assets/img/skills/spring_logo.png'
import reactnativeLogo from '../assets/img/skills/react-native.svg'
import goImg from '../assets/img/skills/GoLogo.svg'
import dockerImg from '../assets/img/skills/docker.png'
import redisImg from '../assets/img/skills/redis_logo.png'
import postgreImg from '../assets/img/skills/PostgreSQL_logo.svg'
import mongodbImg from '../assets/img/skills/mongoDB_logo.png'




import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const projects = [
    {
      title: "Django E-Commerce",
      description: "Django, React, Redux, S3, Heroku, PostgreSQL",
      imgUrl: arashshopImg,
      link: "https://github.com/arash-esfandiari/ArashShop-Django",
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
    {
      title: "Kubernetes",
      description: "Pods, Deployments",
      imgUrl: k8Img,
      link: "https://github.com/arash-esfandiari/kubernetes-demo",
    },
    {
      title: "Game Programming",
      description: "C, OpenGL, 3D Game Design, AI enemies",
      imgUrl: gameImg,
    },
    {
      title: "Blockchain",
      description: "Python, Cryptography, RSA Key Generation, Hashing, PoW, Transactions",
      imgUrl: blockchainImg,
      link: "https://github.com/arash-esfandiari/AryeBlockchain",
    },
  ];
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

  const skills = [
    {
      title: "AWS Certified Cloud Practitioner",
      description: "Cloud Architecture, Storages, Databases",
      imgUrl: awsImg,
    },
    {
      title: "Docker",
      imgUrl: dockerImg,
    },
    {
      title: "Kubernetes",
      imgUrl: k8Img,
    },
    {
      title: "Cryptography",
      description: "Network Security, Cryptography Algorithm Details, Ethical Hacking",
      imgUrl: cryptoImg,
    },
    {
      title: "Parallel Programming",
      description: "C, OpenGL, OpenCL, Multi-Threading",
      imgUrl: parallelProgImg,
    },
    {
      title: "C",
      imgUrl: cImg,
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
      title: "Python",
      imgUrl: pythonImg,
    },
    {
      title: "Django",
      imgUrl: djangoImg,
    },
    {
      title: "Hibernate",
      imgUrl: hibernateImg,
    },
    {
      title: "Redux",
      imgUrl: reduxImg,
    },
    {
      title: "PostgreSQL",
      imgUrl: postgreImg,
    },
    {
      title: "MongoDB",
      imgUrl: mongodbImg,
    },
    {
      title: "Redis",
      imgUrl: redisImg,
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
      title: "Azure",
      imgUrl: azureImg,
    },
    {
      title: "GCP",
      imgUrl: gcpImg,
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
                        <Nav.Link eventKey="first">Projects 💻</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Skills 🍳</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Education 📚</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp" className={isVisible ? "animate__animated animate__slideInUp" : ""}>
                      <Tab.Pane eventKey="first">
                        <Row>
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
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
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
                        </Row>
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
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