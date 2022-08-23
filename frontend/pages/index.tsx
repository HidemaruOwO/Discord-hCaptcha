import Head from "next/head";
import React from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
// styles
import styles from "../styles/Home.module.css";

export default function Home({}) {
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
              <Form>
                <Form.Group className="mb-3" controlId="formDiscordtag">
                  <Form.Label>Discordのタグ</Form.Label>
                  <Form.Control placeholder="Discord太郎#1234" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  認証
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}
