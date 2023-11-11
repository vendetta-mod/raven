import { EmbedBuilder, EmbedData, resolveColor } from "discord.js";
import { client } from "..";

type StatusEmbedType = "info" | "success" | "warn" | "error";

export function createStatusEmbed(type: StatusEmbedType, data: string | EmbedData) {
    const baseEmbedData: EmbedData = { color: resolveColor(client.palette[type]) };
    return new EmbedBuilder({ ...baseEmbedData, ...(typeof data === "string" ? { description: data } : data) });
}
