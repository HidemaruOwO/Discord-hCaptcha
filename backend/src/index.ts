import Discord from "./discord";
import token from "./config/token.json";
import express from "express";
import cors from "cors";
import { verify } from "hcaptcha";

const bot = new Discord();
bot.setToken(token.discord);
bot.run();

const app: express.Express = express();
const port: number = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Discord hCaptcha is Running.");
});

app.post("/auth", async (req: express.Request, res: express.Response) => {
  console.log("POST /auth");
  verify(token.hcaptcha, req.body.captchaToken)
    .then(async (data: VerifyResponse) => {
      console.log("hcaptcha success: " + data.success);
      if (data.success) {
        console.log("hcaptcha passed");
        if (req.body.guildId && req.body.userId && req.body.tag) {
          console.log("role setting");
          const isSuccessSetRole: boolean = await bot.setRole(
            req.body.guildId,
            req.body.userId,
            req.body.tag
          );
          if (isSuccessSetRole) {
            res.status(200).send("Success");
            console.log("setRole is Success");
          } else {
            res.status(503).send("Failure");
            console.log("setRole is Failure");
          }
        }
      } else {
        res.status(503).send("Failure");
        console.log("This token is not valid.");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send("Failure");
    });
});
