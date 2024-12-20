import { Col } from "react-bootstrap";
import "../styles/components/Projects.css"

export const ProjectCard = ({ title, shortDescription, fullDescription, imgUrl, link, gallery, onCardClick }) => {
  return (
    <Col size={12} sm={6} md={4} onClick={() => onCardClick({ title, fullDescription, imgUrl, link, gallery })}>
      <div className="proj-imgbx" style={{ cursor: "pointer" }}>
        <img
          alt="ProjectImg"
          style={{ height: "260px", width: "auto" }}
          className="img-fluid mx-auto d-block"
          src={imgUrl}
        />
        <div className="proj-txtx">
          <h4>{title}</h4>
          <span>{shortDescription}</span>
        </div>
      </div>
    </Col>
  );
};