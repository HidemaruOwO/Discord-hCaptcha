import Head from "next/head";
import React, { useState, useRef, useEffect } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Modal,
  Card,
} from "react-bootstrap";
// styles
import styles from "../styles/Home.module.css";
//json
import Token from "../../config/token.json";

export default function Home({}) {
  const [discordtag, setDiscordtag] = useState<string>("");
  const [token, setToken] = useState(null);
  const [submit, setSubmit] = useState<boolean>(true);
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const captchaRef = useRef(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    captchaRef.current.execute();
  };

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
    setSubmit(false);
  }, [token]);

  const onClickVerify = () => {
    if (token) {
      console.log("Done.");
    } else {
      setShow(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Discord hCaptcha</title>
        <meta name="description" content="Inspecting new users with hcaptcha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.center}>🎮 Discord hCaptcha 🔎</h1>
              <Card className="text-center">
                <Card.Header>Verify Box</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formDiscordtag">
                      <Form.Label>Discordのタグ</Form.Label>
                      <Form.Control
                        placeholder="Discord太郎#1234"
                        value={discordtag}
                        onChange={(e) => {
                          setDiscordtag(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <HCaptcha
                      sitekey={Token.hcaptcha.sitekey}
                      onLoad={onLoad}
                      onVerify={setToken}
                      ref={captchaRef}
                    />
                    <Button
                      variant="primary"
                      type="button"
                      disabled={submit}
                      onClick={onClickVerify}
                    >
                      認証
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Warn</Modal.Title>
        </Modal.Header>
        <Modal.Body>hCaptchで認証してください</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
