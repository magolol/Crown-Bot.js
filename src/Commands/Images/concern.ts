import { MessageEmbed } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "concern",
    description: "show off your concerns",
    example: 'c.concern',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        const e = new MessageEmbed({ title: "concern" });
        e.setFooter(`Command used by ${msg.author.username}`, msg.author.avatarURL());
        e.setImage('https://cdn.discordapp.com/attachments/828284095217270814/860795505872338954/cWXBb5g.png');
        msg.channel.send({embeds: [e]});
    }
}
