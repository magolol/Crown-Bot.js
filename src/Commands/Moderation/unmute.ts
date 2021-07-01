import { Collection, GuildMember, MessageReaction, User } from 'discord.js';
import { createConnection } from 'mysql';
import { Command } from '../../Interfaces'

export const command: Command = {
    "name": "unmute",
    "description": "Unmute someone!",
    example: 'c.unmute MuteMe#5420 { Optional reason }',
    public: true,
    "aliases": [],
    run: async (client, msg, args) => {
        if (args.length === 0 || args.length >= 3) return;
        if (!msg.member.roles.cache.has('832732240843636746')) return;

        if (msg.mentions.members.first().user === client.user) {
            msg.channel.send("no")
                .catch(err => console.error(err));
            return;
        }

        const member: GuildMember = await msg.guild.members.fetch(msg.mentions.users.first().id);
        var reason: String = args[1];

        if (typeof reason !== 'string') reason = 'No Resson Was Provided';
        if (typeof member !== 'object') return;

        const MutedRole = await msg.guild.roles.fetch('696463147934154816');
        const MemberRole = await msg.guild.roles.fetch('643121101035012126');

        const message = await msg.channel.send(`Are you sure you want to unmute **${member.user.tag}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction: MessageReaction, user: User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        await message.awaitReactions({ filter: filter, time: 10000, max: 1, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();

                if (reaction.emoji.name === '👍') {
                    message.delete();

                    const db = createConnection(client.config.dbAll);

                    db.connect(async (err) => {
                        if (err) throw err;

                        const query = `SELECT has_custom_role, custom_role_id FROM Boosters WHERE client_id = '${member.id}'`;

                        db.query(query, async (err, result: any[]) => {
                            if (err) throw err;

                            if (result.length === 1) {
                                if (result[0].has_custom_role) {
                                    const customRole = await msg.guild.roles.fetch(result[0].custom_role_id)
                                    console.log("added custom role")
                                    member.roles.add(customRole);
                                }
                            };

                        });
                        db.destroy();
                    });

                    member.roles.remove(MutedRole);
                    member.roles.add(MemberRole);

                } else {
                    message.delete();
                    msg.delete();
                    msg.channel.send("Ah, alright.")
                        .then((messag) => setTimeout(() => messag.delete(), 2000));
                }
            }).catch((collected: Collection<string, MessageReaction>) => {
                message.delete();
                msg.channel.send("You took too long!")
                    .then((m) => setTimeout(() => m.delete(), 2000));
            });

    }
}
