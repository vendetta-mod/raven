import { Message } from "discord.js";
import { readdir } from "fs/promises";
import { join } from "path";
import { RavenClient } from "../lib/client";

export type CommandCallback = (client: RavenClient, args: string[], message: Message) => Promise<void>;

export interface ICommand {
    name: string;
    description: string;
    su?: boolean;
    handler: CommandCallback | Subcommand[];
}

export class Command implements ICommand {
    public name: string;
    public description: string;
    public su?: boolean;
    public handler: CommandCallback | Subcommand[];

    constructor(co: ICommand) {
        this.name = co.name;
        this.description = co.description;
        this.su = co.su;
        this.handler = co.handler;
    }
}

interface ISubcommand extends ICommand {
    handler: CommandCallback;
}

export class Subcommand extends Command implements ISubcommand  {
    public handler: CommandCallback;

    public constructor(sco: ISubcommand) {
        super(sco);
        this.handler = sco.handler;
    }
}

export const commands = new Array<Command>();

export default async function setupCommandHandler(client: RavenClient) {
    const root = join(__dirname, "../", "commands/").trim();
    const categoryDirs = await readdir(root);

    for (const category of categoryDirs) {
        const categoryDir = await readdir(join(root, category));
        const commandFiles = categoryDir.filter(i => i.endsWith(".js"));
        const subcommandDirs = categoryDir.filter(i => !i.includes("."));

        for (const subcommand of subcommandDirs) {
            const subcommandFiles = (await readdir(join(root, category, subcommand))).filter(i => i.endsWith(".js") && i !== "meta.js");
            const subcommandData = await Promise.all(subcommandFiles.map(async i => ({ ...(await import(join(root, category, subcommand, i))).default })));
            const metaFile = (await import(join(root, category, subcommand, "meta.js"))).default;
            commands.push({ ...metaFile, options: subcommandData.map(i => ({ name: i.name, description: i.description })), handler: subcommandData });
        }

        for (const commandFile of commandFiles) {
            const command = (await import(join(root, category, commandFile))).default;
            commands.push(command);
        }
    }
}
