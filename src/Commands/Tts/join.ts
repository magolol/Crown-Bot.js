import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'join',
    description: 'Make me join a voice call!',
    example: 's.join',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {

        msg.channel.send("Currently cannot work due to discord.js v13 not being finished :c")

        // if (msg.member.voice.channel) {
        //     if (!msg.guild.members.cache.get(client.user.id).voice.channel) {
        //         if (msg.member.voice.channel.type === 'voice' && msg.member.voice.channel.joinable) {
        //             msg.member.voice.channel
        //             client.voice.client
        //         }
        //         msg.react('🤝')
        //         .catch((err) => {
        //             console.error(err);
        //         })
        //     } else {
        //         client.voice.adapters.
        //         forEach(async (channel) => {
        //             if (channel.channel.guild.id === msg.guild.id) {
        //                 if (channel.channel.members.array().length > 1) msg.channel.send("I'm already in a voice channel with others :c");
        //                 else {
        //                     channel.disconnect();
        //                     msg.react('🤝')
        //                        .catch((err) => {
        //                             msg.channel.send(err);
        //                         });
        //                     await msg.member.voice.channel.join()
        //                     .catch(async err => {
        //                         msg.channel.send("it seems I have ran into a problem while joining, mind trying the command again?");
        //                         msg.react('❌')
        //                         .catch((err) => {
        //                             msg.channel.send(err);
        //                         });
        //                         console.error(err);
        //                     });
        //                 }
        //             }
        //         });
        //     }
        // } else msg.channel.send("You must be in a voice channel to use this command!")
    }
}
