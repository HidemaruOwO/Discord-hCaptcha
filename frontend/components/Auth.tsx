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

import "whatwg-fetch";
import styles from "../styles/Auth.module.css";
import config from "../../config/config.json";

type Props = {
  serverId: string;
  userId: string;
};

export default function Auth({ serverId, userId }: Props) {
  const [discordtag, setDiscordtag] = useState<string>("");
  const [token, setToken] = useState(null);
  const [submit, setSubmit] = useState<boolean>(true);
  const [warnShow, setWarnShow] = useState<boolean>(false);
  const handleWarnClose = () => {
    setWarnShow(false);
  };
  const [errorShow, setErrorShow] = useState<boolean>(false);
  const handleErrorClose = () => {
    setErrorShow(false);
  };
  const [doneShow, setDoneShow] = useState<boolean>(false);
  const handleDoneClose = () => {
    setDoneShow(false);
  };
  const captchaRef = useRef(null);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    // captchaRef.current.execute();
    console.log("hCaptcha loaded");
  };

  useEffect(() => {
    if (token) console.log(`hCaptcha Token: ${token}`);
    setSubmit(false);
  }, [token]);

  const onClickVerify = () => {
    if (token) {
      console.log("Done.");
      fetch("https://" + config.url.backend + "/auth", {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: discordtag,
          userId,
          serverId,
          captchaToken: token,
        }),
      }).then(
        function (response: any) {
          console.log(response);
          // passed
          if (response.status === 200) {
            setDoneShow(true);
          } else {
            // failed
            setErrorShow(true);
          }
        },
        function (error: any) {
          console.log(error);
          setErrorShow(true);
        }
      );
    } else {
      setWarnShow(true);
    }
  };

  return (
    <div>
      <Head>
        <title>Discord hCaptcha</title>
        <meta name="description" content="Inspecting new users with hcaptcha" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.background}>
        <Container>
          <Row>
            <Col>
              <h1 className={styles.center}>🎮 Discord hCaptcha 🔎</h1>
              <Card className="text-center">
                <Card.Header>Verify Box</Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="formDiscordtag">
                      <Form.Label>Discordのユーザー名</Form.Label>
                      <Form.Control
                        placeholder="your_discord_username (or Discord太郎#1234)"
                        value={discordtag}
                        onChange={(e) => {
                          setDiscordtag(e.target.value);
                        }}
                      />
                    </Form.Group>
                    <HCaptcha
                      sitekey={config.sitekey}
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
                  <details>
                    <summary>🔎 Discordのユーザー名を確認するには</summary>
                    <iframe
                      title="page card"
                      className="m-auto w-full"
                      frameBorder="0"
                      scrolling="no"
                      loading="lazy"
                      src="https://hatenablog-parts.com/embed?url=https://jinanbo11.com/coin/discord-15/"
                    ></iframe>
                  </details>
                </Card.Body>
                <Card.Footer>ServerID: {serverId}</Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>

      <Modal show={warnShow} onHide={handleWarnClose}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Warn</Modal.Title>
        </Modal.Header>
        <Modal.Body>hCaptchで認証してください</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleWarnClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={errorShow} onHide={handleErrorClose}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Erorr</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          エラーが発生しました。
          <br />
          サーバー管理者に連絡してください
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleErrorClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={doneShow} onHide={handleDoneClose}>
        <Modal.Header closeButton>
          <Modal.Title>✔ Done</Modal.Title>
        </Modal.Header>
        <Modal.Body>認証できました</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDoneClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
