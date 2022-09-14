import {
  Client,
  BaseCommandInteraction,
  MessageButton,
  MessageActionRow,
} from "discord.js";
import { Command } from "../interface";

const cmd: Command = {
  data: {
    name: "genbutton",
    description: "認証ボタンを作成します",
    defaultMemberPermissions: ["ADMINISTRATOR"],
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    const guild = interaction.guild;
    await interaction.reply({
      content: "ボタンを作成します",
      ephemeral: true,
    });
    const role = guild?.roles.cache.find((role) => role.name === "verified");
    if (role === undefined) {
      await interaction.editReply({
        content: "Verifiedロールが存在しません",
      });
      return;
    }
    const button = new MessageButton()
      .setCustomId("verify")
      .setStyle("PRIMARY")
      .setLabel("認証")
      .setEmoji("✅");
    await interaction.channel?.send({
      embeds: [
        {
          title: "認証方法",
          description: "認証を行うには、以下のボタンを押してください",
          color: "RANDOM",
          timestamp: new Date(),
          footer: {
            text: "©️ HidemaruOwO | Discord hCaptcha",
          },
        },
      ],
      components: [new MessageActionRow().addComponents(button)],
    });
    await interaction.editReply({ content: "ボタンを作成しました" });
  },
};

export { cmd };
