import { Client, BaseCommandInteraction } from "discord.js";
import { Command } from "../interface";

const cmd: Command = {
  data: {
    name: "genrole",
    description: "Verifiedロールを作成します",
    defaultMemberPermissions: ["ADMINISTRATOR"],
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    const guild = interaction.guild;
    await interaction.reply({
      content: "ロールを作成します",
      ephemeral: true,
    });
    const role = guild?.roles.cache.find((role) => role.name === "verified");
    if (!role === undefined) {
      await interaction.editReply({
        content: "Verifiedロールが存在します",
      });
      return;
    }
    guild?.roles.create({ name: "verified" });
    await interaction.editReply({
      content: "ロールを作成しました",
    });
  },
};

export { cmd };
