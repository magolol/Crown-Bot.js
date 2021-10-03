import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "alex",
    description: "alex moment",
    example: 'c.alex',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "alex moment" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://media.discordapp.net/attachments/693941496147214357/773255455857704980/image0.png?width=465&height=475');
        msg.channel.send({embeds: [e]});
    }
}
