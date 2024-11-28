import { Col } from "react-bootstrap";

export const ProjectCard = ({ title, description, imgUrl, link }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <a className="link-light" target="_blank" rel="noopener noreferrer" href={link}>
        <div className="proj-imgbx">
          <img alt="ProjectImg" style={{ height: "260px", width: "auto" }} className="img-fluid mx-auto d-block" src={imgUrl} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </div>
      </a>
    </Col>
  )
}
