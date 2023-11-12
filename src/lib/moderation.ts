import { Snowflake } from "discord.js";
import { Case, CaseType } from "@prisma/client";
import { createStatusEmbed } from "./common";
import { client } from "..";

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

enum PrettyCaseTypes {
    WARN = "warned",
    MUTE = "muted",
    KICK = "kicked",
    BAN = "banned",
    UNBAN = "unbanned",
}

export async function createModerationEmbed(modCase: Case) {
    const user = await client.users.fetch(modCase.userId);

    return createStatusEmbed("success", `Created case ${modCase.id} - ${user} has been ${PrettyCaseTypes[modCase.type]}.`);
}
