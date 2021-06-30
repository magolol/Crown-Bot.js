import { Emoji } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'leave',
    description: 'Make me leave a voice call',
    example: 's.leave',
    public: true,
    aliases: ['die', 'goaway', 'go_away', 'death'],
    run: async (client, msg, args) => {

        msg.channel.send("Currently not available due to discord.js v13 not being finished :c")

        // if (!msg.member.voice.channel) {
        //     client.voice.connections.array().
        //         forEach(async (channel) => {
        //             if (channel.channel.guild.id === msg.guild.id) {
        //                 if (channel.channel.members.array().length >= 0) {
        //                     channel.disconnect();
        //                 }
        //             }
        //         });
        // } else {
        //     client.voice.connections.array().
        //         forEach(async (channel) => {
        //             if (channel.channel.guild.id === msg.guild.id) {
        //                 if (channel.channel.members.array().length >= 0||
        //                 channel.channel.members.has(msg.author.id)) {
        //                     channel.disconnect();
        //                     msg.react('👋')
        //                     .catch((err) => {
        //                         console.log(err);
        //                     })
        //                 }
        //             }
        //         });
        // }
    }
}
