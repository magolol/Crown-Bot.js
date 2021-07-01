import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "otis",
    description: "otis moment",
    example: 'c.otis',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "billy moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/750513295441788979/859851979069456424/image0.png?width=333&height=442');
        msg.channel.send({ embeds: [e]});
    }
}
