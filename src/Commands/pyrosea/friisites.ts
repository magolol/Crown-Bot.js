import { MessageEmbed } from 'discord.js';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'friisites',
    example: 'c.friisites',
    description: 'Get some backups',
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
            title: 'the frii place',
            color: 3447003,
            fields: [
                {
                    name: '**Alvros can be found here ||https://docs.google.com/spreadsheets/d/19tAZ1KNEUZ58e-4kPJGh947alDb1oyrNpzcnCLk7DEE/pubhtml|| **',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**Hshop is the go to for 3DS backups and can be found here ||https://hshop.erista.me/|| **',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**WiiWare and other wii related stuff can be found here ||https://drive.google.com/drive/folders/1ZpX5Nh4BNzWDvpXJJuqVlX2Qz7xpwpVU|| **',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**The ublock origin tab has various consoles and tools listed on it.|| https://rentry.co/24ufx || **',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**Vimm.net is an excellent source for classic roms. Very reliable.|| https://vimm.net/ ||**',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**Wii U common key, used for backups ||D7B00402659BA2ABD2CB0DB27FA2B656||**',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                },
                {
                    name: '**Edge Emu is very similar to vimms and is also a verified good source || https://edgeemu.net ||**',
                    value: `${await loopDir(join(__dirname, '..', 'pyrosea'))}`
                }
            ],
            footer: { text: 'frii' }
        });
        msg.channel.send({ embeds: [em]})
            .catch(err => console.error(err));
    }
}
