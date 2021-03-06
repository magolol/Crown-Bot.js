import { Command } from "../../Interfaces";
import wikipedia from 'wikipedia';
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'wikipedia_search',
    description: 'Get a summary of what wikipedia article you would like!',
    example: 'c.wikipedia_search [Search Query]',
    public: true,
    aliases: ['wiki_search', 'search'],
    run: async (client, msg, args) => {
        if (args.length === 0) return;

        if (msg.channel.id === '832727131221655553') {

            wikipedia.search(args.toString().replace(/,/g, ' '), {limit: 20})
            .then((srch) => {
                const results: string[] = []

                srch.results.forEach((result) => {
                    results.push(result.title)
                });

                const e = new MessageEmbed({
                    title: 'Wikipedia Search',
                    color: 3066993,
                    fields: [
                        {name: '**results**', value: results.toString().replace(/,/g, '\n'), inline: true},
                    ],
                    footer: { text: `Command by ${msg.author.username}`, iconURL: msg.author.avatarURL() }
                });
                e.setThumbnail('https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png');
                msg.channel.send({ embeds: [e]});
            })
            .catch((err) => {
                msg.channel.send("I see to have run into an error, displaying error!\n`" + err + "`");
            });

        } else {
            msg.channel.send("you can only use this command in <#693942287910305842>");
        }

    }
}
