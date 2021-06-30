import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "candice",
    description: "candice moment",
    example: 'c.candice',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "candice moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/693942287910305842/753749038356103318/cat_next_to_camera2.jpg');
        msg.channel.send({ embed: e });
    }
}
