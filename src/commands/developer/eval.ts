import { codeBlock, cleanCodeBlockContent } from "discord.js";
import { inspect } from "util";
import { Command } from "../../handlers/command";
import { createStatusEmbed } from "../../lib/embeds";

const AsyncFunction = (async function () {}).constructor;

export default new Command({
    name: "eval",
    description: "Run JS in the bot context - for developers!",
    su: true,
    handler: async (client, args, message) => {
        const code = args.join(" ");
        const before = Date.now();

        let took;
        let result;
        let embed;

        const baseFields = [{ name: "Evaluated", value: codeBlock("js", cleanCodeBlockContent(code.substring(0, 1000))), inline: false }];

        try {
            result = await (AsyncFunction("client", "args", "message", "require", code))(client, args, message, require);
            took = Date.now() - before;

            embed = createStatusEmbed("success", {
                fields: [
                    { name: "Time", value: `${took}ms`, inline: true },
                    { name: "Type", value: typeof result, inline: true },
                    ...baseFields,
                ]
            });

            if (result !== undefined) embed.addFields([{ name: "Result", value: codeBlock("js", cleanCodeBlockContent(inspect(result, { showHidden: true }).substring(0, 1000))), inline: false }]);
        } catch (error) {
            const typedError = error as Error;

            embed = createStatusEmbed("error", {
                fields: [
                    ...baseFields,
                    { name: "Error", value: codeBlock("js", cleanCodeBlockContent((typedError.stack ?? typedError.toString()).substring(0, 1000))), inline: false },
                ]
            });
        }

        await message.reply({ embeds: [embed] });
    }
});
