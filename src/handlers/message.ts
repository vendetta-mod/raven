import { RavenClient } from "../lib/client";
import { createStatusEmbed } from "../lib/embeds";
import { commands } from "./command";

export default async function setupMessageHandler(client: RavenClient) {
    client.on("messageCreate", async (message) => {
        if (message.author.bot || !message.member || message.guildId !== client.config.guild || !message.content.startsWith(client.config.prefix)) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift()!.toLowerCase();

        const command = commands.find(c => c.name === commandName);
        if (!command) return;

        if (command.su && !client.config.superusers.includes(message.author.id)) {
            message.reply({ embeds: [createStatusEmbed("error", `${message.author.username} is not in the sudoers file. This incident will be reported.`)] });
            return;
        }

        if (command.requiredPermissions && !message.member.permissions.has(command.requiredPermissions)) {
            message.reply({ embeds: [createStatusEmbed("error", "You do not have permission to use this command.")] });
            return;
        }

        try {
            if (typeof command.handler === "function") {
                await command.handler(client, args, message);
            } else {
                const subcommand = command.handler.find(s => s.name === args[0]);
                if (!subcommand) return;

                await subcommand.handler(client, args.slice(1), message);
            }
        } catch(e) {
            const error = e as Error;
            await message.reply({
                embeds: [createStatusEmbed("error", "I ran into an error running that command! I've reported it, and it should be fixed soon.")],
            });
            console.log(error.stack ?? error.toString());
        }
    });
}
