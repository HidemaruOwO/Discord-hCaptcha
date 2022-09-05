import { Client, Intents, Guild } from "discord.js";
import { Command } from "./interface";
import fs from "node:fs";

export interface DiscordClass {
  setToken: (token: string) => void;
  run: () => void;
}

export default class Discord implements DiscordClass {
  botToken: string;

  constructor() {
    this.botToken = "";
  }

  setToken(token: string): void {
    this.botToken = token;
  }

  run() {
    const client: Client = new Client({
      intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
    });

    const commands: any = {};
    let data: any[] = [];
    const commandFiles: string[] = fs
      .readdirSync("./dist/commands")
      .filter((file: string) => file.endsWith(".js"));

    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      console.log(command);
      commands[command.cmd.data.name] = command;
    }

    client.once("ready", async () => {
      for (const commandName in commands) {
        data.push(commands[commandName].cmd.data);
      }
      console.log(data);
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

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) {
        return;
      }
      console.log("interaction.commandName: " + interaction.commandName);
      console.log(commands);
      const command: Command = commands[interaction.commandName].cmd;
      try {
        await command.execute(client, interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          embeds: [
            {
              title: "コマンドの実行で例外が生じました",
              description:
                "権限が不足してませんか？\n確実にエラーを根絶するにはADMIN権限をBOTに付与してください",
            },
          ],
          ephemeral: true,
        });
      }
    });

    client.login(this.botToken);
  }
}
