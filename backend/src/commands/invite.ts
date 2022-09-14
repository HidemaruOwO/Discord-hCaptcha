import { Client, BaseCommandInteraction } from "discord.js";
import { Command } from "../interface";

const cmd: Command = {
  data: {
    name: "url",
    description: "このBotに関連するURLを表示します",
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    await interaction.reply({
      embeds: [
        {
          title: "関連URL",
          description: "このBotの関連URLは以下の通りです",
          color: "RANDOM",
          fields: [
            {
              name: "招待リンク",
              value:
                "https://discord.com/api/oauth2/authorize?client_id=1016347472022474773&permissions=1110517566518&scope=bot%20applications.commands",
            },
            {
              name: "公式ドキュメント",
              value: "https://discord-hcaptcha.doc.v-sli.me/",
            },
            {
              name: "GitHub Repository",
              value: "https://github.com/HidemaruOwO/discordjs-hcaptcha",
            },
          ],
        },
      ],
      ephemeral: true,
    });
  },
};

export { cmd };
