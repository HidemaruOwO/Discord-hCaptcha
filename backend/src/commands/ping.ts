import { Client, BaseCommandInteraction } from "discord.js";
import { Command } from "../interface";

const cmd: Command = {
  data: {
    name: "ping",
    description: "Botのレイテンシを表示します",
  },
  async execute(client: Client, interaction: BaseCommandInteraction) {
    const emoji = ["🟢", "🟡", "🔴"];

    let websocketPing: number = client.ws.ping;
    let websocketPingMsg: string = "";

    if (websocketPing < 140) {
      websocketPingMsg = `${emoji[0]} ${websocketPing}ミリ秒`;
    } else if (websocketPing > 140 && websocketPing < 200) {
      websocketPingMsg = `${emoji[1]} ${websocketPing}ミリ秒`;
    } else if (websocketPing > 200) {
      websocketPingMsg = `${emoji[2]} ${websocketPing}ミリ秒`;
    }

    let apiLatency: number = Date.now() - interaction.createdTimestamp;
    let apiLatencyMsg: string = "";

    if (apiLatency < 140) {
      apiLatencyMsg = `${emoji[0]} ${apiLatency}ミリ秒`;
    } else if (apiLatency > 140 && apiLatency < 200) {
      apiLatencyMsg = `${emoji[1]} ${apiLatency}ミリ秒`;
    } else if (apiLatency > 200) {
      apiLatencyMsg = `${emoji[2]} ${apiLatency}ミリ秒`;
    }

    await interaction.reply({
      embeds: [
        {
          title: ":ping_pong: Ping!!Pong!!",
          description: "Ping値を計測してきました!!",
          fields: [
            { name: "WebSocket Speed", value: websocketPingMsg },
            { name: "APIレイテンシ", value: apiLatencyMsg },
          ],
          color: "RANDOM",
          timestamp: new Date(),
        },
      ],
    });
  },
};

export { cmd };
