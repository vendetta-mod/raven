import { ActivityType, EmbedBuilder, EmbedData, resolveColor } from "discord.js";
import { RavenClient } from "./client";
import { client } from "..";

export function resolveActivityType(type: ActivityTypeResolvable) {
    if (typeof type === "string") {
        switch (type.toLowerCase()) {
            case "playing":
                return ActivityType.Playing;
            case "streaming":
                return ActivityType.Streaming;
            case "listening":
                return ActivityType.Listening;
            case "watching":
                return ActivityType.Watching;
            case "custom":
                return ActivityType.Custom;
            case "competing":
                return ActivityType.Competing;
            default:
                throw new Error(`Unknown activity type: ${type}`);
        }
    } else {
        return type;
    }
}

// This is icky but I hate discord.js
export async function setupActivityLoop(client: RavenClient) {
    const constants = await client.getConstants();
    client.user?.setActivity(constants.activity);
    setInterval(() => client.user?.setActivity(constants.activity), 900000);
}

export function createStatusEmbed(type: StatusEmbedType, data: string | EmbedData) {
    const baseEmbedData: EmbedData = { color: resolveColor(client.palette[type]) };
    return new EmbedBuilder({ ...baseEmbedData, ...(typeof data === "string" ? { description: data } : data) });
}

export const isSnowflake = (id: string): boolean => {
    try {
        BigInt(id).toString();
    } catch {
        return false;
    }

    return true;
}
