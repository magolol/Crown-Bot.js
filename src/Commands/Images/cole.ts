import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "cole",
    description: "cole moment",
    example: 'c.cole',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "cole moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/693941496147214357/768460791962664970/20201021_000957.jpg');
        msg.channel.send({ embeds: [e]});
    }
}
