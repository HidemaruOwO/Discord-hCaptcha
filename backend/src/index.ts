import Discord from "./discord";
import token from "./config/token.json";
import express from "express";
import { verify } from "hcaptcha";

const bot = new Discord();
bot.setToken(token.discord);
bot.run();

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3001, () => {
  console.log("Listening on port 3000");
});

app.post("/auth", (req: express.Request, res: express.Response) => {
  verify(token.hcaptcha, req.body.captchaToken)
    .then((data: VerifyResponse) => {
      if (data.success) {
        bot.setRole(req.body.guildId, req.body.userId, req.body.tag);
        res.status(200).send("Success");
      } else {
        res.status(503).send("Failure");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(503).send("Failure");
    });
});
