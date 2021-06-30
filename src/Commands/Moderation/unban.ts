import { Collection, MessageReaction, User } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'unban',
    description: 'Feel like you made a mistake? Maybe want to give someone a second chance? Unban someone!',
    example: 'c.unban BanMe@1234 { Optional reason }',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        if (args.length === 0) return;
        if (!msg.member.permissions.has('BAN_MEMBERS')) return;

        const reason: string = args.length === 1 ? "No reason was provided" : args.shift().toString().replace(/,/g, ' ');

        if (msg.mentions.members.first().user === client.user) {
            msg.channel.send("no")
                .catch(err => console.error(err));
            return;
        }

        const message = await msg.channel.send(`Are you sure you want to unban **${args[0]}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction: MessageReaction, user: User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        message.awaitReactions(filter, { idle: 10000, max: 1, errors: ['time'] })
            .then(async (collected) => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    try {
                        msg.guild.bans.cache.forEach((ban) => {
                            if (ban.user.tag === args[0]) msg.guild.members.unban(ban.user, reason);
                        });
                    } catch {
                        msg.channel.send("Could not find the person :(")
                            .catch(err => console.error(err))
                    }
                    await msg.channel.send(`Successfully unbanned ${args[0]}`);
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
