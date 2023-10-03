import { Client, BaseCommandInteraction } from "discord.js";
import { Command } from "../interface";
import { genRole } from "../generalFunctions";

const cmd: Command = {
  data: {
    name: "genrole",
    description: "Verifiedロールを作成します",
    defaultMemberPermissions: ["ADMINISTRATOR"],
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    await interaction.reply({
      content: "ロールを作成します",
      ephemeral: true,
    });
    genRole(client, interaction);
  },
};

export { cmd };
