import { Command } from '../../Interfaces';
import path from 'path';
import { readdir } from 'fs/promises'
import { MessageEmbed } from 'discord.js';

export const command: Command = {
    name: 'info',
    example: 'c.info { Command Name } ',
    description: 'Get descriptions of commands!',
    public: true,
    aliases: ['example', 'information', 'aliases', 'detail', 'details'],
    run: async (client, msg, args) => {
        if (!args[0]) return;
        const CommandPath = path.join(__dirname, '..', '..', "Commands");
        readdir(CommandPath)
            .then((p) => {
                p.forEach((dir) => {
                    if (!(dir.toLowerCase() === 'admin')) {
                        readdir(`${CommandPath}/${dir}`)
                        .then((fi) => {
                            fi.forEach((file) => {
                                if (file.toLowerCase().startsWith(args[0].toLowerCase())) {
                                    const { command } = require(`${CommandPath}/${dir}/${args[0].toLowerCase()}.ts`);

                                    if (!(command.public)) return;

                                    const description: string = typeof command.description !== 'undefined' ? command.description : 'This command has no description'

                                    const aliases: string = (command.aliases.length === 0) ? 'This command has no aliases' : command.aliases.toString().replace(/,/g, ' ');

                                    const example: string = command.example;

                                    const em = new MessageEmbed({
                                        title: `Info for ${args[0].toLowerCase()}`,
                                        color: 3066993,
                                        fields: [
                                            {name: "**Description**", value: `*${description}*`},
                                            {name: "**Category**", value: `*${dir}*`},
                                            {name: "**Aliases**", value: `\`\`\`\n${aliases}\n\`\`\``},
                                            {name: "**example**", value: `\`\`\`\n${example}\n\`\`\``}
                                        ]
                                    });
                                    em.setFooter(`Command by ${msg.author.username}`, msg.author.avatarURL());

                                    msg.channel.send({embed: em}) 
                                    .catch(err => console.error(err))
                                    return;
                                }
                            })
                        })
                    }
                });
            })
        .catch((err) => {})
    }
}
