import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "sus",
    description: "AMOGUS",
    example: 'c.sus',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "sussy" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://images-ext-1.discordapp.net/external/5hfKW3n0cxUaaURh5e5GZ4OhvFvFNnzFdP6xm9FByWU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/720920220776136726/db2bb9b168ce6d485baa8433a5b15d8c.png');
        msg.channel.send({ embeds: [e]});
    }
}
