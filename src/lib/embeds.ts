import { EmbedBuilder, EmbedData, resolveColor } from "discord.js";
import { Case } from "@prisma/client";
import { client } from "..";

type StatusEmbedType = "info" | "success" | "warn" | "error";

export function createStatusEmbed(type: StatusEmbedType, data: string | EmbedData) {
    const baseEmbedData: EmbedData = { color: resolveColor(client.palette[type]) };
    return new EmbedBuilder({ ...baseEmbedData, ...(typeof data === "string" ? { description: data } : data) });
}

export async function createCaseEmbed(modCase: Case) {
    const moderator = await client.users.fetch(modCase.moderatorId);
    const user = await client.users.fetch(modCase.userId);

    return createStatusEmbed("info", {
        author: {
            name: `${moderator.tag} (${moderator.id})`,
            iconURL: moderator.displayAvatarURL({ size: 128 }),
        },
        description: `**User:** ${user.toString()} (${user.id})\n**Action:** ${modCase.type}\n**Reason:** ${modCase.reason}`,
        footer: { text: `Case ${modCase.id}` },
        timestamp: modCase.createdAt,
    });
}
