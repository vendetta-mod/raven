import { GatewayIntentBits } from "discord.js";
import { RavenClient } from "./lib/client";
import { setupDataLink } from "./lib/data";
import { setupActivityLoop } from "./lib/common";

import setupCommandHandler from "./handlers/command";
import setupMessageHandler from "./handlers/message";

export const client = new RavenClient({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    allowedMentions: { parse: ["users"] },
    config: setupDataLink("config", true),
});

client.once("ready", async () => {
    console.log("raven is initialising...");

    await setupCommandHandler(client);
    await setupMessageHandler(client);
    await setupActivityLoop(client);

    console.log("raven is ready!");
});

client.login(client.config.token);
