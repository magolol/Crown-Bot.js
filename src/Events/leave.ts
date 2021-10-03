import { GuildMember, MessageEmbed, TextChannel } from 'discord.js';
import { Events } from '../Interfaces';

export const event: Events = {
    name: 'guildMemberRemove',
    run: async (client, member:GuildMember) => {
        console.log(`${member.user.tag} left the server!`);
        member.guild.channels.cache.filter(c => c.type === 'text')
            .forEach((channel: TextChannel) => {
                if (channel.id === '832645362442829826') {
                    const em = new MessageEmbed({
                        title: `${member.user.tag} left the server 😔`,
                        color: 15158332
                    })
                    channel.send({ embeds: [em]})
                        .catch(err => console.error(err))
                }
            })
    }
}
