import { Client, Intents, Guild } from "discord.js";
import { Command } from "./interface";
import token from "./config/token.json";
import fs from "node:fs";

const client: Client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const commands: any = {};
let data: any[] = [];
const commandFiles: string[] = fs
  .readdirSync("./src/commands")
  .filter((file: string) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command: Command = require(`./src/commands/${file}`);
  commands[command.data.name] = command;
}

client.once("ready", async () => {
  for (const commandName in commands) {
    data.push(commands[commandName].data);
  }
  client.guilds.cache
    .map((guild: Guild) => guild.id)
    .forEach((id: string) => {
      client.application?.commands.set(data, id);
    });
  console.log("Ready: " + client.user?.tag);
  setInterval(() => {
    client.user?.setActivity({
      name: `/ | ${client.guilds.cache.size}Guilds | ${client.guilds.cache
        .map((guild: Guild) => guild.memberCount)
        .reduce((p: number, c: number) => p + c)}Users`,
    });
  }, 10000);
});

client.login(token.discord);
