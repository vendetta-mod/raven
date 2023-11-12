import { Subcommand } from "../../../handlers/command";
import { createStatusEmbed } from "../../../lib/common";

export default new Subcommand({
    name: "delete",
    description: "Delete a moderation case.",
    handler: async (client, args, message) => {
        const caseId = parseInt(args[0]);
        if (!caseId || isNaN(caseId)) return message.reply({ embeds: [createStatusEmbed("error", "Invalid case ID!")] });

        const foundCase = await client.prisma.case.findUnique({ where: { id: caseId } });
        if (!foundCase) return message.reply({ embeds: [createStatusEmbed("error", "Couldn't find that case...")] });

        await client.prisma.case.delete({ where: { id: caseId } });

        message.reply({ embeds: [createStatusEmbed("success", `Case ${caseId} has been deleted successfully.`)] });
    }
});
