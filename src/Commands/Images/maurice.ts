import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "dumbass",
    description: "maurice moment",
    example: 'c.dumbass',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "maurice moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/750513295441788979/803341526784016405/image0.jpg');
        msg.channel.send({ embed: e });
    }
}
