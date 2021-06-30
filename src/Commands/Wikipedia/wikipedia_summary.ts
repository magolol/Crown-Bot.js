import { Command } from "../../Interfaces";
import wikipedia from 'wikipedia';
import { MessageEmbed } from "discord.js";

export const command: Command = {
    name: 'wikipedia_summary',
    description: 'Get a summary of what wikipedia article you would like!',
    example: 'c.wikipedia_summary [Exact Page Name]',
    public: true,
    aliases: ['wiki_summary', 'summary'],
    run: async (client, msg, args) => {
        if (args.length === 0) return;

        if (msg.channel.id === '832727131221655553') {
            wikipedia.page(args.toString().replace(/,/g, ' '))
            .then(async (page) => {
                const summary = (await page.summary()).extract;

                if (summary.toLowerCase().endsWith('may refer to:')) {
                    wikipedia.search(args.toString().replace(/,/g, ' '), { limit: 20 })
                        .then((srch) => {
                            const results: string[] = []

                            srch.results.forEach((result) => {
                                results.push(result.title)
                            });

                            const e = new MessageEmbed({
                                title: 'Wikipedia Search',
                                color: 3066993,
                                fields: [
                                    { name: '**results**', value: results.toString().replace(/,/g, '\n'), inline: true },
                                ],
                                footer: { text: `Command by ${msg.author.username}`, iconURL: msg.author.avatarURL() }
                            });
                            e.setThumbnail('https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png');
                            msg.channel.send({content: 'I ran into a disambiguation!\n search one of these instead:', embed: e});
                        })
                        .catch((err) => {
                            msg.channel.send("I see to have run into an error, displaying error!\n`" + err + "`");
                        });
                        return;
                }

                const em = new MessageEmbed({
                    title: page.title,
                    color: 3066993,
                    footer: {text: `Command by ${msg.author.username}`, iconURL: msg.author.avatarURL()},
                    fields: [
                        {name: 'Wikipedia Summary', value: summary, inline: true}
                    ]
                });
                em.setThumbnail('https://media.discordapp.net/attachments/756027330656337951/844262888097185802/1200px-Wikipedia-logo-v2.png');
                msg.channel.send({
                    embed: em,
                    components: [
                        {
                            type: 1,
                            components: [
                                {
                                    type: 2,
                                    label: 'View Full Page',
                                    style: 5,
                                    url: page.fullurl
                                }
                            ]
                        }
                    ]
                });
            })
            .catch(async (err) => {
                msg.channel.send("Couldn't find the page `" + args.toString().replace(/,/g, ' ') + "`, maybe try searching for it?");
            })

        } else {
            msg.channel.send("you can only use this command in <#693942287910305842>");
        }

    }
}
