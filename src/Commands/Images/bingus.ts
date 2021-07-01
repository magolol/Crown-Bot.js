import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "bingus",
    description: "shadow realm moment",
    example: 'c.bingus',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "bingus moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/750513295441788979/859853589542993990/20m2mrk5fxo51.png');
        msg.channel.send({ embeds: [e]});
    }
}
