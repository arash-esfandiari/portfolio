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

  // A full-stack e-commerce platform built with Django, React, and Redux, featuring , robust state management, and AWS RDS for scalable data storage. The platform allows users to manage accounts, search products, and complete purchases seamlessly, while an admin panel enables efficient product and user management, including updates and deletions. The project showcases my proficiency in full-stack development, emphasizing secure and efficient e-commerce solutions.
  const projects = [
    {
      title: "ArashShop",
      shortDescription: "Django, React, Redux, S3, Heroku, PostgreSQL",
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Django E-Commerce</strong></p>
          <br />
          <ul>
            <li><strong>Technologies Used:</strong>
              <ul>
                <li>Django, React, and Redux for development.</li>
                <li>AWS RDS for scalable data storage.</li>
                <li>Robust state management.</li>
              </ul>
            </li>
            <li><strong>User Features:</strong>
              <ul>
                <li>Manage accounts.</li>
                <li>Search for products.</li>
                <li>Complete purchases seamlessly.</li>
              </ul>
            </li>
            <li><strong>Admin Panel:</strong>
              <ul>
                <li>Efficient product and user management.</li>
                <li>Includes features for product updates and deletions.</li>
              </ul>
            </li>
            <li><strong>Project Highlights:</strong>
              <ul>
                <li>Demonstrates proficiency in full-stack development.</li>
                <li>Focuses on secure and efficient e-commerce solutions.</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      imgUrl: arashshopImg,
      link: "https://github.com/arash-esfandiari/ArashShop-Django",
      gallery: [
        arashshopImg,
      ],
    },
    {
      title: "Arashflix",
      shortDescription: "React, Firebase, TMDB Live Database",
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Netflix-inspired ReactJS app.</strong></p>
          <br />
          <ul>
            <li><strong>Technologies Used:</strong>
              <ul>
                <li>ReactJS and Firebase.</li>
                <li>Integration with The Movie Database (TMDB) API.</li>
              </ul>
            </li>
            <li><strong>Project Highlights:</strong>
              <ul>
                <li>First ReactJS website developed after graduating from university.</li>
                <li>Mimics Netflix's design and user interface.</li>
                <li>Showcases up-to-date movies and series.</li>
              </ul>
            </li>
            <li><strong>Features:</strong>
              <ul>
                <li>Automated trailer finder (works occasionally).</li>
                <li>Displays movie and series information from TMDB.</li>
              </ul>
            </li>
            <li><strong>Limitations:</strong>
              <ul>
                <li>Does not implement image optimization.</li>
                <li>Lacks lazy loading, resulting in slower image loading.</li>
              </ul>
            </li>
            <li><strong>Personal Reflection:</strong>
              <ul>
                <li>Represents early steps into web development.</li>
                <li>Reflects a passion for building interactive applications.</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      imgUrl: arashflixImg,
      link: "https://arashflix.web.app/",
      gallery: [
        arashflixImg,
      ],
    },
    {
      title: "Uberlone",
      shortDescription: "React Native, Redux, Google Maps API",
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Uber-like React Native app.</strong></p>
          <br />
          <ul>
            <li><strong>Project Description:</strong>
              <ul>
                <li>A React Native Uber clone application.</li>
                <li>Features a sleek and intuitive interface similar to Uber.</li>
              </ul>
            </li>
            <li><strong>Key Features:</strong>
              <ul>
                <li>Calculates trip cost estimates based on the origin and destination.</li>
                <li>Leverages real-time traffic data and fastest routes via Google Maps integration.</li>
                <li>Offers multiple ride options:
                  <ul>
                    <li>Uberlone X</li>
                    <li>Uberlone XL</li>
                    <li>Uberlone LUX</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>Technical Highlights:</strong>
              <ul>
                <li>Optimized pricing formulas for accurate fare estimates.</li>
                <li>Fare estimates closely match Uber’s rates.</li>
              </ul>
            </li>
            <li><strong>User Experience:</strong>
              <ul>
                <li>Provides a seamless and reliable experience for trip planning.</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
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
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Containerized Deployment</strong></p>
          <br />
          <ul>
            <li><strong>Project Overview:</strong> A Kubernetes-based deployment for a MongoDB database and a Node.js web application, showcasing secure integration and scalability.</li>
            <li><strong>MongoDB Deployment:</strong>
              <ul>
                <li>Deployed using the <code>mongo:5.0</code> image.</li>
                <li>Credentials managed securely with Kubernetes Secrets.</li>
                <li>Exposed on port <code>27017</code> via a NodePort service.</li>
              </ul>
            </li>
            <li><strong>Web Application Deployment:</strong>
              <ul>
                <li>Deployed using the <code>nanajashia/k8s-demo-app:1.0</code> image.</li>
                <li>Connects to MongoDB using Secrets and a ConfigMap for the database URL.</li>
                <li>Exposed on port <code>3000</code>.</li>
              </ul>
            </li>
            <li><strong>Key Features:</strong>
              <ul>
                <li>Secure management of sensitive data using Kubernetes Secrets.</li>
                <li>ConfigMap used to pass the MongoDB connection URL to the web application.</li>
                <li>Scalable deployment with replica settings for both services.</li>
              </ul>
            </li>
          </ul>
        </div >
      ),
      imgUrl: k8Img,
      link: "https://github.com/arash-esfandiari/kubernetes-demo",
      gallery: [
        k8Img,

      ],
    },
    {
      title: "YourCraft",
      shortDescription: "C, OpenGL, 3D Game Design, Intelligent Enemies",
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Minecraft-inspired 3D game</strong></p>
          <br />
          <ul>
            <li><strong>Game Overview:</strong>
              <ul>
                <li>A Minecraft-inspired game with two levels: an underground dungeon and an open-world terrain.</li>
              </ul>
            </li>
            <li><strong>Technologies Used:</strong>
              <ul>
                <li>Written in <code>C</code> using <code>OpenCL</code> for parallel computing and <code>OpenGL</code> for rendering.</li>
              </ul>
            </li>
            <li><strong>Key Features:</strong>
              <ul>
                <li><strong>Underground Dungeon:</strong>
                  <ul>
                    <li>Intense gameplay with intelligent enemies.</li>
                    <li>Enemies attack when you enter their field of vision.</li>
                  </ul>
                </li>
                <li><strong>Open World:</strong>
                  <ul>
                    <li>Features valleys and troughs created using procedural world-generation algorithms.</li>
                  </ul>
                </li>
                <li><strong>Level Transition:</strong>
                  <ul>
                    <li>Elevator system connecting the open world and the dungeon.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>Gameplay Highlights:</strong>
              <ul>
                <li>Strategic exploration with visually rich environments.</li>
                <li>Adaptive AI-driven enemy behavior for a challenging experience.</li>
                <li>Dynamic world-building for diverse and immersive terrains.</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      imgUrl: gameImg,
      gallery: [
        gameImg,
      ],
    },
    {
      title: "RashCoin",
      shortDescription: "Python, Cryptography, RSA Key Generation, Hashing, PoW, Transactions",
      fullDescription: (
        <div>
          <h3>Description</h3>
          <p><strong>Python-based blockchain system</strong></p>
          <br />
          <ul>
            <li><strong>Project Overview:</strong> A Python-based blockchain implementation featuring core cryptographic and mining functionalities.</li>
            <li><strong>Key Features:</strong>
              <ul>
                <li><strong>Nonce Generation:</strong> Implements proof-of-work consensus by generating nonces for block mining.</li>
                <li><strong>Transaction Verification:</strong> Validates transactions before they are added to the blockchain.</li>
                <li><strong>Miner Functionality:</strong> Includes a mining process to secure the blockchain and add new blocks.</li>
                <li><strong>Signatures:</strong> Utilizes digital signatures to ensure transaction authenticity and integrity.</li>
                <li><strong>Key Generation:</strong> Generates public and private key pairs for secure identity management.</li>
                <li><strong>Cryptographic Features:</strong>
                  <ul>
                    <li>Employs hashing algorithms (e.g., SHA-256) for data integrity.</li>
                    <li>Supports encryption and decryption mechanisms for secure communication.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><strong>Use Cases:</strong>
              <ul>
                <li>Securely recording and verifying transactions in a distributed ledger.</li>
                <li>Demonstrating cryptographic principles in blockchain systems.</li>
                <li>Simulating real-world blockchain mining and validation processes.</li>
              </ul>
            </li>
            <li><strong>Technologies Used:</strong> Developed in Python with libraries for cryptographic operations (e.g., <code>hashlib</code>, <code>ecdsa</code>).</li>
          </ul>
        </div>
      ),
      imgUrl: blockchainImg,
      link: "https://github.com/arash-esfandiari/AryeBlockchain",
      gallery: [
        blockchainImg,
      ],
    },
  ];
  const education = [
    {
      title: "University of Guelph",
      fullDescription: (
        <div>
          <br />
          <h3>University of Guelph</h3>
          <p><strong>Honours Bachelor of Computing</strong></p>
          <br />
          <p>
            Graduated at the top of my class, showcasing academic excellence and a strong foundation in computing.
          </p>
        </div>
      ),
      imgUrl: guelphImg,
    },
    {
      title: "Software Engineering Major",
      shortDescription: "University of Guelph",
      fullDescription: (
        <div>
          <br />
          <h3>University of Guelph</h3>
          <p><strong>Honours Bachelor of Computing</strong></p>
          <br />
          <ul>
            <li><strong>Programming Proficiency:</strong> Gaining expertise in multiple programming paradigms and languages.</li>
            <li><strong>Algorithmic Thinking:</strong> Designing and analyzing efficient algorithms.</li>
            <li><strong>Software Engineering:</strong> Developing, testing, and maintaining software systems.</li>
            <li><strong>Systems Understanding:</strong> Comprehending operating systems, compilers, and computer architecture.</li>
            <li><strong>Mathematical Foundations:</strong> Applying calculus, linear algebra, and statistics in computing contexts.</li>
            <li><strong>Problem-Solving:</strong> Employing logical and analytical skills to tackle complex computing challenges.</li>
            <li><strong>Team Collaboration:</strong> Working effectively in group settings to develop software solutions.</li>
            <li><strong>Communication:</strong> Articulating technical concepts clearly in both written and oral forms.</li>
          </ul>
        </div>
      ),
      imgUrl: softengImg,
    },
    {
      title: "Business Minor",
      shortDescription: "University of Guelph",
      fullDescription: (
        <div>
          <br />
          <h3>University of Guelph</h3>
          <p><strong>Minor in Business</strong></p>
          <br />
          <ul>
            <li><strong>Foundational Business Knowledge:</strong> Principles of management, marketing, finance, and economics.</li>
            <li><strong>Strategic Thinking:</strong> Analyzing business scenarios and formulating strategies.</li>
            <li><strong>Financial Literacy:</strong> Understanding budgeting, accounting, and financial statements.</li>
            <li><strong>Marketing Skills:</strong> Consumer behavior, market research, and strategy development.</li>
            <li><strong>Leadership and Teamwork:</strong> Building and leading effective teams.</li>
            <li><strong>Problem-Solving:</strong> Critical thinking for addressing business challenges.</li>
            <li><strong>Business Communication:</strong> Professional writing and presentation skills.</li>
            <li><strong>Entrepreneurial Skills:</strong> Basics of new venture creation and business planning.</li>
            <li><strong>Ethics:</strong> Awareness of corporate responsibility and ethical decision-making.</li>
          </ul>
        </div>
      ),
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
    <section className="project" id="experience">
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
                  <h2>Experience 🛤️</h2>
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