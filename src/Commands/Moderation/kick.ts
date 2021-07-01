import { Collection, MessageReaction, User } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'kick',
    description: 'Kick Someone!',
    example: 'c.kick @KickMe { Optional reason }',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0) return;
        if (!msg.member.permissions.has('KICK_MEMBERS')) return;

        if (msg.mentions.members.first().user === client.user) {
            msg.channel.send("no")
                .catch(err => console.error(err));
            return;
        }

        const reason: string = args.length === 1 ? "No reason was provided" : args.shift().toString().replace(/,/g, ' ');

        const message = await msg.channel.send(`Are you sure you want to kick **${msg.mentions.members.first().user.tag}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction: MessageReaction, user: User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        message.awaitReactions({ filter: filter, idle: 10000, max: 1, errors: ['time'] })
            .then(async (collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    msg.mentions.members.first().kick(reason)
                    .then((mem) => {
                        msg.channel.send(`I have successfully kicked ${mem.user.tag}`);
                    })
                    .catch((err) => {
                        msg.channel.send("It seems that I have ran into an error!\nerror: `" + err + "`");
                    });
                } else {
                    await message.delete();
                    await msg.delete();
                    msg.channel.send("Ok then..")
                        .then((messag) => setTimeout(() => messag.delete(), 2000));
                }

            })
            .catch((collected: Collection<string, MessageReaction>) => {
                message.delete();
                msg.channel.send("You took too long!")
                    .then((m) => setTimeout(() => m.delete(), 2000));
            });

    }
}
