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
      if (role === void 0) {
         try {
            guild?.roles.create({ name: "verified" });
         } catch (err) {
            await interaction.editReply({
               content:
                  "ロールの作成に失敗しました\n権限が不足している可能性があります",
            });
            return;
         }

         await interaction.editReply({
            content: "ロールを作成しました",
         });
      } else {
         await interaction.editReply({
            content: "Verifiedロールが存在します",
         });
         return;
      }
   },
};

export { cmd };
