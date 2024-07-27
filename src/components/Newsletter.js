import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";

export const Newsletter = ({ status, message, onValidated }) => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (status === 'success') clearFields();
  }, [status])

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email
      })
  }

  const clearFields = () => {
    setEmail('');
  }

  return (
    <Col lg={12}>
      <div className="newsletter-bx wow slideInUp">
        <Row>
          <h3>Thank you for taking the time to review my portfolio. <br />If you have any questions or would like to discuss further opportunities, please feel free to get in touch. </h3>
        </Row>
      </div>
    </Col>
  )
}
