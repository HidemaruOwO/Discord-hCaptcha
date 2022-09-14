import {
  Client,
  Intents,
  Guild,
  MessageButton,
  MessageActionRow,
} from "discord.js";
import { Command } from "./interface";
import config from "./config/config.json";
import fs from "node:fs";

export interface DiscordClass {
  setToken: (token: string) => void;
  setRole: (guildId: string, userId: string, tag: string) => Promise<boolean>;
  run: () => void;
}

export default class Discord implements DiscordClass {
  botToken: string;
  client: Client;

  constructor() {
    this.botToken = "";
    this.client = new Client({
      intents: [],
    });
  }

  setToken(token: string): void {
    this.botToken = token;
  }

  async setRole(
    guildId: string,
    userId: string,
    tag: string
  ): Promise<boolean> {
    console.log(
      "Running setRole\nguildId: " + guildId + "\nuserId: " + userId
    ) +
      "\ntag: " +
      tag;
    const guild = this.client.guilds.cache.get(guildId);

    if (guild === undefined) {
      console.log("Don't found guild: " + guildId);
      return false;
    }

    console.log("Guild name: " + guild.name);

    const role = guild.roles.cache.find((role) => role.name === "verified");

    if (role === undefined) {
      this.client.users.cache
        .get(guild.ownerId)
        ?.send(
          "**" +
            guild.name +
            "**に**verified**という名前のロールがありません\nそのため認証ができません\n`/genrole`コマンドで**verified**ロールを作成してください"
        );
      console.log("Don't found verified role");
      return false;
    }

    const member = await guild.members.fetch(userId);
    if (member === undefined) {
      console.log("Don't found member: " + userId);
      return false;
    }

    if (member.user.tag === tag) {
      member.roles.add(role);
      console.log("Success set role to " + tag);
      return true;
    } else {
      console.log("Don't match tag");
      return false;
    }
  }

  run() {
    this.client = new Client({
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

    this.client.once("ready", async () => {
      for (const commandName in commands) {
        data.push(commands[commandName].cmd.data);
      }
      console.log(data);
      this.client.guilds.cache
        .map((guild: Guild) => guild.id)
        .forEach((id: string) => {
          this.client.application?.commands.set(data, id);
        });
      console.log("Ready: " + this.client.user?.tag);
      setInterval(() => {
        this.client.user?.setActivity({
          name: `/ | ${
            this.client.guilds.cache.size
          }Guilds | ${this.client.guilds.cache
            .map((guild: Guild) => guild.memberCount)
            .reduce((p: number, c: number) => p + c)}Users`,
        });
      }, 10000);
    });

    this.client.on("interactionCreate", async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === "verify") {
          let url: string =
            "https://" +
            config.url.frontend +
            "/auth" +
            "?s=" +
            interaction.guild?.id +
            "&u=" +
            interaction.user.id;

          const button = new MessageButton()
            .setURL(url)
            .setStyle("LINK")
            .setLabel("認証")
            .setEmoji("✅");

          await interaction.deferReply({ ephemeral: true });
          await interaction.followUp({
            content: "このボタンを押すと認証サイトに飛ぶことができます",
            components: [new MessageActionRow().addComponents(button)],
          });
        }
      }

      if (interaction.isCommand()) {
        console.log("interaction.commandName: " + interaction.commandName);
        console.log(commands);
        const command: Command = commands[interaction.commandName].cmd;
        try {
          await command.execute(this.client, interaction);
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
      }
    });

    this.client.login(this.botToken);
  }
}
