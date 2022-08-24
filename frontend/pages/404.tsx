import Auth from "../components/Auth";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

import styles from "../styles/404.module.css";

export default function NotFound() {
  const [serverId, setServerId] = React.useState<string>("");
  useEffect(() => {
    setServerId(window.location.pathname.split("/")[1]);
    console.log("serveId: " + serverId);
  }, []);

  if (serverId.match(/^[0-9]+$/)) {
    return (
      <div className={styles.background}>
        <Auth serverId={serverId} />
      </div>
    );
  } else {
    return (
      <>
        <Container>
          <Row>
            <Col className="text-center">
              <h1>404</h1>
              <p>{serverId} is not the discord server id.</p>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
