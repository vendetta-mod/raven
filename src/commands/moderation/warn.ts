import { Command } from "../../handlers/command";
import { createStatusEmbed } from "../../lib/embeds";

export default new Command({
    name: "warn",
    description: "Give a user a warning.",
    requiredPermissions: ["ModerateMembers"],
    handler: async (client, args, message) => {
        const user = message.mentions.users.first() ?? await client.users.fetch(args[0]);
        if (!user) message.reply({ embeds: [createStatusEmbed("error", "Couldn't resolve that user!")] });

        const reason: string = args.length > 1 ? args.slice(1).join(" ") : "No reason provided";
        
        const newWarn = await client.prisma.case.create({
            data: {
                type: "WARN",
                moderatorId: message.author.id,
                userId: user.id,
                reason: reason,
            }
        });

        message.reply({ embeds: [createStatusEmbed("success", `Created case ${newWarn.id}, warned ${user} for "${reason}"`)] });
    }
});
