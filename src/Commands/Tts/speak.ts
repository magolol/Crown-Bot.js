import { Command } from '../../Interfaces';
const gTTS = require('gtts');
import { createReadStream } from 'fs';

export const command: Command = {
    name: 'speak',
    description: "If you can't/don't want to speak you can use this command!",
    example: 's.speak [Message]',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {

        msg.channel.send("currently not available because discord.js v13 isn't finished :c");

        // if (!msg.member.voice.channel) {msg.channel.send("you're not even in a channel lmao");return;}

        // async function playAudio(quick?: boolean) {
        //     var conn: VoiceConnection = undefined;
        //     client.voice.connections.forEach((connection) => {
        //         if (connection.channel.id === msg.guild.member(client.user).voice.channel.id) {
        //             conn = connection;
        //         }
        //     });

        //     const tts = new gTTS(args.toString().replace(/,/g, ' '), 'en');
        //     tts.save('/tmp/audio.ogg', () => {
        //         // I prefer to save it in my temp folder but you
        //         // can choose whatever folder you want
        //         // example vvv
        //         // tts.save('../../../data/audio.mp3');
                
        //         // const dispatcher = conn.play('/tmp/audio.ogg', {volume: 1, bitrate: 'auto', type: 'ogg/opus', seek: 0});
        //         const dispatcher = conn.play(createReadStream('/tmp/audio.ogg'));
        //         // const dispatcher = conn.play('../../../data/audio.mp3');

        //         dispatcher.on('finish', () => {
        //             if (quick) conn.disconnect();
        //         })
                
        //         dispatcher.on('error', (err) => {
        //             msg.channel.send(`There was an error while trying to play audio!\nError: ${err}`);
        //             console.error(err);
        //         });
        //     });
        // }

        // if (msg.guild.member(client.user).voice.channel ) {
        //     if (msg.guild.member(client.user).voice.channel.id === msg.member.voice.channel.id)  await playAudio();
        //     else {
        //         var memberCount: number = msg.guild.member(client.user).voice.channel.members.array().length;

        //         msg.guild.member(client.user).voice.channel.members.
        //         forEach((member) => {
        //             if (member.user.bot) memberCount = memberCount - 1; 
        //         })
        //         if (memberCount === 0) { msg.guild.member(client.user).voice.channel.leave();
        //              msg.member.voice.channel.join().then(async () => {await playAudio();})}
        //     }

        // } else if (!msg.guild.member(client.user).voice.channel) {
        //     if (msg.member.voice.channel) {
        //         msg.member.voice.channel.join()
        //         .then(() => {playAudio(true);})
        //     };
        // } else return;
    }
}
