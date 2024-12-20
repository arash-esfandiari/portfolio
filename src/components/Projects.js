import React, { useState } from "react";
import "../styles/components/Projects.css"

import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import { ProjectCard } from "./ProjectCard";
import ProjectModal from "./ProjectModal";
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
import bagImg from '../assets/img/education/bag.png'

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
import postgreImg from '../assets/img/skills/postgreSQL.webp'
import mongodbImg from '../assets/img/skills/mongoDB_logo.png'

// App Gallery
import uberloneMain from "../assets/img/appGallery/Uberlone/Uberlone-main.webp"
import uberloneRides from "../assets/img/appGallery/Uberlone/Uberlone-rides.webp"

import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Projects = () => {
  const [showModal, setShowModal] = useState(false); // Controls modal visibility
  const [selectedProject, setSelectedProject] = useState(null); // Selected project data

  // Function to handle project card click
  const handleCardClick = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };


  const projects = [
    {
      title: "Django E-Commerce",
      shortDescription: "Django, React, Redux, S3, Heroku, PostgreSQL",
      fullDescription: "A full-stack e-commerce platform built with Django, React, and Redux, featuring secure user authentication with JWT, robust state management, and AWS RDS for scalable data storage. The platform allows users to manage accounts, search products, and complete purchases seamlessly, while an admin panel enables efficient product and user management, including updates and deletions.",
      imgUrl: arashshopImg,
      link: "https://github.com/arash-esfandiari/ArashShop-Django",
      gallery: [
        arashshopImg,
        arashshopImg,
        arashshopImg,
      ],
    },
    {
      title: "Arashflix",
      shortDescription: "React, Firebase, TMDB Live Database",
      fullDescription: "ArashFlix is the first ReactJS website I developed after graduating from university, created by following online tutorials. Built with ReactJS and Firebase, this site mimics Netflix’s design and showcases up-to-date movies and series by integrating The Movie Database (TMDB) API. It features an automated trailer finder that occasionally locates matching trailers on YouTube, delivering a dynamic and engaging user experience. However, the project does not yet implement image optimization or lazy loading, which results in slower image loading times. ArashFlix reflects my early steps into web development and my passion for building interactive applications.",
      imgUrl: arashflixImg,
      link: "https://arashflix.web.app/",
      gallery: [
        arashflixImg,
        arashshopImg,
        arashshopImg,
      ],
    },
    {
      title: "Uberlone",
      shortDescription: "React Native, Redux, Google Maps API",
      fullDescription: "A React Native Uber clone application featuring a sleek and intuitive interface similar to Uber. The app calculates trip cost estimates based on the origin and destination, leveraging real-time traffic data and the fastest routes via Google Maps integration. It offers multiple ride options, including Uberlone X, Uberlone XL, and Uberlone LUX, mimicking Uber’s ride classes. Using optimized pricing formulas, the app delivers highly accurate fare estimates closely matching Uber’s rates, providing a seamless and reliable user experience for trip planning.",
      imgUrl: uberloneImg,
      link: "https://github.com/arash-esfandiari/uberlone",
      gallery: [
        uberloneMain,
        uberloneRides,
      ],
    },
    {
      title: "Kubernetes",
      shortDescription: "Pods, Deployments",
      fullDescription: "This is the full description of this section. This is the full description of this section. This is the full description of this section. This is the full description of this section. This is the full description of this section.",
      imgUrl: k8Img,
      link: "https://github.com/arash-esfandiari/kubernetes-demo",
      gallery: [
        arashshopImg,
        arashshopImg,
        arashshopImg,
        arashshopImg,
      ],
    },
    {
      title: "YourCraft",
      shortDescription: "C, OpenGL, 3D Game Design, AI enemies",
      fullDescription: "This is the full description of this section.",
      imgUrl: gameImg,
      gallery: [
        arashshopImg,
        arashshopImg,
        arashshopImg,
        arashshopImg,
      ],
    },
    {
      title: "RashCoin",
      shortDescription: "Python, Cryptography, RSA Key Generation, Hashing, PoW, Transactions",
      fullDescription: "This is the full description of this section.",
      imgUrl: blockchainImg,
      link: "https://github.com/arash-esfandiari/AryeBlockchain",
      gallery: [
        arashshopImg,
        arashshopImg,
        arashshopImg,
        arashshopImg,
      ],
    },
  ];
  const education = [
    {
      title: "University of Guelph",
      imgUrl: guelphImg,
    },
    {
      title: "Software Engineering Major",
      shortDescription: "University of Guelph",
      imgUrl: softengImg,
    },
    {
      title: "Business Minor",
      shortDescription: "University of Guelph",
      imgUrl: bagImg,
    },
  ];

  const skills = [
    {
      title: "AWS Certified Cloud Practitioner",
      shortDescription: "Cloud Architecture, Storages, Databases",
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
      shortDescription: "Network Security, Cryptography Algorithm Details, Ethical Hacking",
      imgUrl: cryptoImg,
    },
    {
      title: "Parallel Programming",
      shortDescription: "C, OpenGL, OpenCL, Multi-Threading",
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
      title: "Hibernate",
      imgUrl: hibernateImg,
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
      title: "JavaScript",
      imgUrl: javascriptImg,
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
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Relevant Skills</h2>
                  <p>A brief history about my professional life.</p>
                  <Tab.Container id="projects-tabs" defaultActiveKey="first">
                    <Nav
                      variant="pills"
                      className="nav-pills mb-5 justify-content-center align-items-center"
                      id="pills-tab"
                    >
                      <Nav.Item>
                        <Nav.Link eventKey="first">Education 📚</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">Skills 🍳</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">Projects 💻</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content
                      id="slideInUp"
                      className={
                        isVisible ? "animate__animated animate__slideInUp" : ""
                      }
                    >
                      {/* Education Tab */}
                      <Tab.Pane eventKey="first">
                        <Row>
                          {education.map((educItem, index) => (
                            <ProjectCard
                              key={index}
                              {...educItem}
                              onCardClick={handleCardClick}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>

                      {/* Skills Tab */}
                      <Tab.Pane eventKey="second">
                        <Row>
                          {skills.map((skill, index) => (
                            <ProjectCard
                              key={index}
                              {...skill}
                              onCardClick={handleCardClick}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>

                      {/* Projects Tab */}
                      <Tab.Pane eventKey="third">
                        <Row>
                          {projects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              {...project}
                              onCardClick={handleCardClick}
                            />
                          ))}
                        </Row>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>

      {/* Modal Component */}
      <ProjectModal
        show={showModal}
        onClose={() => setShowModal(false)}
        project={selectedProject}
      />

      <img
        className="background-image-right"
        src={colorSharp2}
        alt="bck-img"
      ></img>
    </section>
  )
}