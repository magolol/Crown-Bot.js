import { MessageEmbed } from 'discord.js';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'help',
    example: 'c.help',
    description: 'Get a list of all commands!',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        async function loopDir(dirname:string):Promise<string> {
            var final = '';
            const files = await readdir(dirname)
                files.forEach((file) => {
                    if (file.endsWith('.ts') && !(file.endsWith('.d.ts'))) {
                        const { command } = require(`${dirname}/${file}`)
                        final += command.public ? `\`${file.replace('.ts', '')}\`, ` : ''
                    }
                });
            return final.substring(0, final.length-2);
        }

        const em = new MessageEmbed({
            title: 'Help menu',
            color: 3447003,
            fields: [
                {
                    name: '**Funni**',
                    value: `${await loopDir(join(__dirname, '..', 'Funni'))}`
                },
                {
                    name: '**Images**',
                    value: `${await loopDir(join(__dirname, '..', 'Images'))}`
                },
                {
                    name: '**Misc**',
                    value: `${await loopDir(join(__dirname, '..', 'Misc'))}`
                },
                {
                    name: '**Moderation**',
                    value: `${await loopDir(join(__dirname, '..', 'Moderation'))}`
                },
                {
                    name: '**Tts**',
                    value: `${await loopDir(join(__dirname, '..', 'Tts'))}`
                },
                {
                    name: '**Wikipedia**',
                    value: `${await loopDir(join(__dirname, '..', 'Wikipedia'))}`
                }
            ],
            footer: { text: 'https://github.com/magolol/C-r-o-w-n-e-d-Bot.js' }
        });
        msg.channel.send({ embeds: [em]})
            .catch(err => console.error(err));
    }
}
