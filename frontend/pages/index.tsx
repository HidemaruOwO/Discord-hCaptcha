import Head from "next/head";
import React from "react";
import {Container} from "react-bootstrap";

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
      </Container>
      </main>
    </div>
  );
}
