import Discord from "./discord";
import token from "./config/token.json";

const bot = new Discord();
bot.setToken(token.discord);
bot.run();
