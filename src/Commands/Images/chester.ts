import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "chester",
    description: "chester has returned",
    example: 'c.chester',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "chester moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/693680984306221126/777590561393082388/20201115_124701.jpg?width=470&height=474');
        msg.channel.send({ embeds: [e]});
    }
}
