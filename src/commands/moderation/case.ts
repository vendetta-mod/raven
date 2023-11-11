import { Command } from "../../handlers/command";
import { createStatusEmbed } from "../../lib/embeds";

export default new Command({
    name: "case",
    description: "Get info on a moderation case.",
    requiredPermissions: ["ModerateMembers"],
    handler: async (client, args, message) => {
        const caseId = parseInt(args[0]);
        if (!caseId || isNaN(caseId)) {
            message.reply({ embeds: [createStatusEmbed("error", "Invalid case ID!")] });
            return;
        }

        const foundCase = await client.prisma.case.findUnique({ where: { id: caseId } });
        if (!foundCase) {
            message.reply({ embeds: [createStatusEmbed("error", "Couldn't find that case...")] });
            return;
        }

        const moderator = await client.users.fetch(foundCase.moderatorId);
        const user = await client.users.fetch(foundCase.userId);

        message.reply({
            embeds: [createStatusEmbed("info", {
                author: {
                    name: `${moderator.tag} (${moderator.id})`,
                    iconURL: moderator.displayAvatarURL({ size: 128 }),
                },
                fields: [
                    { name: "Type", value: foundCase.type, inline: true },
                    { name: "User", value: user.toString(), inline: true },
                    { name: "Reason", value: foundCase.reason },
                ],
                footer: { text: `Case ${foundCase.id}` },
                timestamp: foundCase.createdAt,
            })],
        });
    }
});
