import { Client, BaseCommandInteraction } from "discord.js";

export type Command = {
  data: {
    name: string;
    description: string;
    defaultMemberPermissions?: string[];
    options?: {
      name?: string;
      description?: string;
      type?: string;
      options?: {
        name?: string;
        description?: string;
        type?: string;
      }[];
    }[];
  };
  execute(client?: Client, interaction?: BaseCommandInteraction): Promise<void>;
};
