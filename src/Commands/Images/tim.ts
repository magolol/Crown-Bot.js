import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "tim",
    description: "tim moment",
    example: 'c.tim',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "tim moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/750513295441788979/801969157155454986/unknown.png');
        msg.channel.send({ embeds: [e]});
    }
}
