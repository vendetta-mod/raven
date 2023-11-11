import { Command } from "../../handlers/command";
import { createCaseEmbed, createStatusEmbed } from "../../lib/embeds";

export default new Command({
    name: "case",
    description: "Get info on a moderation case.",
    requiredPermissions: ["ModerateMembers"],
    handler: async (client, args, message) => {
        const caseId = parseInt(args[0]);
        if (!caseId || isNaN(caseId)) return message.reply({ embeds: [createStatusEmbed("error", "Invalid case ID!")] });

        const foundCase = await client.prisma.case.findUnique({ where: { id: caseId } });
        if (!foundCase) return message.reply({ embeds: [createStatusEmbed("error", "Couldn't find that case...")] });

        message.reply({ embeds: [await createCaseEmbed(foundCase)] });
    }
});
