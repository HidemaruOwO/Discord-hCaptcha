import { Client, BaseCommandInteraction } from "discord.js";
import { Command } from "../interface";
import { genButton } from "../generalFunctions";

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
      genButton(client, interaction, guild);
   },
};

export { cmd };
