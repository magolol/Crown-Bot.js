import { GuildEmoji, GuildMember, TextChannel } from 'discord.js';
import { Events } from '../Interfaces';

export const event: Events = {
    name: 'guildMemberAdd',
    run: async (client, member:GuildMember) => {
        console.log(`${member.user.username} has joined the server!`);
        var kirby: GuildEmoji = undefined;

        member.guild.emojis.cache.forEach((emoji:GuildEmoji) => {
            if (emoji.name.toLowerCase() === 'kirby') kirby = emoji;
        });

        member.guild.channels.cache.filter(c => c.type === 'text')
        .forEach((channel:TextChannel) => {
            if (channel.id === '693680984306221126') {
                const choices = [
                    'joined the arena',
                    'entered the server',
                    'arrived'
                ]
                channel.send(`${member.user.username} has ${choices[Math.floor(Math.random() * choices.length)]}!`)
                    .then((m) => {
                        m.react(kirby)
                            .catch(err => console.error(err))
                    })
                    .catch(err => console.error(err))
            }
        })
    }
}
