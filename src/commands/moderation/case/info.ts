import { Subcommand } from "../../../handlers/command";
import { createStatusEmbed } from "../../../lib/common";
import { createCaseEmbed } from "../../../lib/moderation";

export default new Subcommand({
    name: "info",
    description: "Get info on a moderation case.",
    handler: async (client, args, message) => {
        const caseId = parseInt(args[0]);
        if (!caseId || isNaN(caseId)) return message.reply({ embeds: [createStatusEmbed("error", "Invalid case ID!")] });

        const foundCase = await client.prisma.case.findUnique({ where: { id: caseId } });
        if (!foundCase) return message.reply({ embeds: [createStatusEmbed("error", "Couldn't find that case...")] });

        message.reply({ embeds: [await createCaseEmbed(foundCase)] });
    }
});
