import {
   Client,
   BaseCommandInteraction,
   MessageButton,
   MessageActionRow,
   Guild,
} from "discord.js";

const genRole = async (client: Client, interaction: BaseCommandInteraction) => {
   const guild = interaction.guild;

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
};

const genButton = async (
   client: Client,
   interaction: BaseCommandInteraction,
   guild: Guild | null
) => {
   if (guild === null) {
      interaction.editReply("サーバー内で実行してください");
      return;
   }
   const role = guild?.roles.cache.find((role) => role.name === "verified");
   if (role === void 0) {
      await interaction.editReply({
         content:
            "Verifiedロールが存在しません\n`/genrole`コマンドを実行して再度お試しください",
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
};

export { genRole, genButton };
