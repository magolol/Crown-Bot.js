import { Collection, MessageReaction, User } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'ban',
    description: 'Ban someone, within reason of course...',
    example: 'c.ban @YaMomLmaoGottem { Optional Reason }',
    public: true,
    aliases: ['yeet'],
    run: async (client, msg, args) => {
        if (args.length === 0) return;
        if (!msg.member.permissions.has('BAN_MEMBERS')) return;

        if (msg.mentions.members.first().user === client.user) {
            msg.channel.send("no")
                .catch(err => console.error(err));
            return;
        }

        const reason: string = args.length === 1 ? "No reason was provided" : args.shift().toString().replace(/,/g, ' ');

        const message = await msg.channel.send(`Are you sure you want to ban **${msg.mentions.members.first().user.tag}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction: MessageReaction, user: User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        message.awaitReactions(filter, {idle: 10000, max: 1, errors: ['time']})
        .then(async (collected) => {
            const reaction = collected.first();

            if (reaction.emoji.name === '👍') {
                msg.guild.members.fetch()
                .then(async (members) => {
                    members.forEach(async (member) => {
                        if (member.id === msg.mentions.members.first().id) member.ban({reason: reason})
                            .catch(err => msg.channel.send(`I cannot ban them because: \`${err}\``));
                    })
                    message.delete();
                    msg.delete();
                })
                .catch((err) => {
                    msg.channel.send("there was an error fetching members\nerror: `" + err + "`");
                    console.error(err);
                    return;
                });
                msg.channel.send(`I have successfully banned ${msg.mentions.members.first().user.tag}`)

            } else {
                await message.delete();
                await msg.delete();
                msg.channel.send("Ok then..")
                    .then((messag) => setTimeout(() => messag.delete(), 2000));
            }

        })
        .catch((collected: Collection<string, MessageReaction>) => {
            msg.delete();
            message.delete();
            msg.channel.send("You took too long!")
                .then((m) => setTimeout(() => m.delete(), 2000));
        });

    }
}
