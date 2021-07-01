import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "joey",
    description: "joey moment",
    example: 'c.joey',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({title: "joey moment"});
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/693941496147214357/762032313567019048/IMG_20201003_102333.jpg?width=555&height=475');
        msg.channel.send({ embeds: [e]});
    }
}
