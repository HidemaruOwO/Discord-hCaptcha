import { Container, Row, Col } from "react-bootstrap";

export default function NotFound() {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
            <h1>404</h1>
            <p>not found.</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
