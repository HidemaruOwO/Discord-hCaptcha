import {
  Client,
  BaseCommandInteraction,
  MessageButton,
  MessageActionRow,
} from "discord.js";
import { genButton, genRole } from "../generalFunctions";
import { Command } from "../interface";

const cmd: Command = {
  data: {
    name: "setup",
    description: "Discord hCaptch認証のセットアップをします",
    defaultMemberPermissions: ["ADMINISTRATOR"],
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    const guild = interaction.guild;
    await interaction.reply({
      content: "セットアップを開始します",
      ephemeral: true,
    });
    await interaction.editReply({
      content: "ロールを作成します",
    });
    genRole(client, interaction);
    await interaction.editReply({
      content: "ボタンを作成します",
    });
    genButton(client, interaction, interaction.guild);
    await interaction.editReply({ content: "セットアップを完了しました" });
  },
};

export { cmd };
