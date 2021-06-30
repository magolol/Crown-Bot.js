import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "joe",
    description: "joe moment",
    example: 'c.joe',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({title: "Joe moment"});
        e.setFooter(`Command by ${msg.author.username}`, msg.author.avatarURL())
        e.setImage('https://media.discordapp.net/attachments/693941496147214357/753068754228871309/cat_next_to_camera.jpg');
        msg.channel.send({ embed: e });
    }
}
