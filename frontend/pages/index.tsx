import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";

export default function Home({}) {
  return (
    <>
      <Container>
        <Row>
          <Col className="text-center">
            <h1>Running Auth Discord Bot</h1>
            <p>
              このページはhCaptchaで新規ユーザーをテストするBotのルートページです
              <br />
              サイトを閉じてください
            </p>
            <Image
              src="/image/kawaii-wanko.gif"
              objectFit="contain"
              width={810}
              height={540}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
