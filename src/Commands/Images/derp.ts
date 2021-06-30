import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "derp",
    description: "it exists..that's kinda it",
    example: 'c.derp',
    public: true,
    aliases: ['doncon'],
    run: async (client, msg, args) => {
        const e = new MessageEmbed();
        e.setFooter(`Command by ${msg.author.username}`, msg.author.avatarURL())
        e.setImage('https://media.discordapp.net/attachments/626617640634286081/754460623496151182/image0.png');
        msg.channel.send({ embed: e });
    }
}
