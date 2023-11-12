import { Subcommand } from "../../../handlers/command";
import { createStatusEmbed } from "../../../lib/common";

export default new Subcommand({
    name: "update",
    description: "Update the reason of a moderation case.",
    handler: async (client, args, message) => {
        const caseId = parseInt(args[0]);
        if (!caseId || isNaN(caseId)) return message.reply({ embeds: [createStatusEmbed("error", "Invalid case ID!")] });

        const reason: string = args.length > 1 ? args.slice(1).join(" ") : "No reason provided";

        const foundCase = await client.prisma.case.findUnique({ where: { id: caseId } });
        if (!foundCase) return message.reply({ embeds: [createStatusEmbed("error", "Couldn't find that case...")] });

        await client.prisma.case.update({ where: { id: caseId }, data: { reason: reason } });

        message.reply({ embeds: [createStatusEmbed("success", `Case ${caseId} has been updated successfully.`)] });
    }
});
