import { User, Guild, TextChannel, ColorResolvable, Client, ClientOptions } from "discord.js";
import { resolveActivityType } from "./utils";

export interface Config {
    token: string;
    prefix: string;
    superusers: string[];
    guild: string;
    channels: {
        log: string;
    }
    activity: {
        name: string;
        type: ActivityTypeResolvable;
    };
}

export interface Constants {
    superusers: User[];
    guild: Guild;
    channels: {
        log: TextChannel;
    }
    activity: {
        name: string;
        type: number;
    }
}

interface RavenClientOptions extends ClientOptions {
    config: Config;
}

export class RavenClient extends Client {
    config: Config;
    palette: Record<string, ColorResolvable> = {
        accent: "#00B9B9",
        error: "#BD4879",
        warn: "#FFC076",
        success: "#90C2A4",
    };

    getConstants = async (): Promise<Constants> => ({
        superusers: await Promise.all(this.config.superusers.map(async (id) => await this.users.fetch(id))),
        guild: await this.guilds.fetch(this.config.guild),
        channels: {
            log: (await this.channels.fetch(this.config.channels.log)) as TextChannel,
        },
        activity: {
            name: this.config.activity.name,
            type: resolveActivityType(this.config.activity.type),
        },
    });

    public constructor(co: RavenClientOptions) {
        super(co);
        this.config = co.config;
    };
}
