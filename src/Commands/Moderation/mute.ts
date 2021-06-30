import { Collection, CollectorFilter, GuildMember, Message, MessageReaction, Role, User } from 'discord.js';
import { createConnection } from 'mysql';
import { Command } from '../../Interfaces'

export const command: Command = {
    "name": "mute",
    "description": "Mute someone!",
    example: 'c.mute @MuteMe { Optional reason }',
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
        
        const message = await msg.channel.send(`Are you sure you want to mute **${member.user.tag}**`);
        await message.react('👍');
        await message.react('👎');

        const filter = (reaction:MessageReaction, user:User) => { //filtering the reactions from the user
            return (
                ['👎', '👍'].includes(reaction.emoji.name) && user.id === msg.author.id
            );
        }

        await message.awaitReactions(filter, {time: 10000,max: 1, errors: ['time']})
        .then(collected => {
            const reaction = collected.first();

            if (reaction.emoji.name === '👍') {
                message.delete();
                    
                const db = createConnection(client.config.dbAll);

                db.connect((err) => {
                    if (err) throw err;

                    const q = `SELECT has_custom_role, custom_role_id FROM Boosters WHERE client_id = '${member.id}'`;

                    console.log(q);
                        db.query(q, (err, result:any[]) => {
                            if (err) throw err;

                            console.log(result.length);
                            console.log(result);

                            if (result.length === 1) {
                                console.log("entered if statement");
                                if (result[0].has_custom_role) {

                                    console.log("entered second if statement");

                                    const id: string = result[0].custom_role_id.toString();

                                    
                                    member.roles.cache.forEach((role) => {
                                        console.log(`${role.id} ${id} ${role.id === id}`)
                                        if (role.id === id) {
                                            console.log("just made it to the ForEach loop")
                                            member.roles.remove(role);
                                        }
                                    });
                                    console.log("done!");
                                }
                            };

                        });
                    console.log("alright destorying the cursor ig");
                    db.end();
                });

                member.roles.add(MutedRole);
                member.roles.remove(MemberRole);

            } else {
                message.delete();
                msg.delete();
                msg.channel.send("Ah, alright.")
                    .then((messag) => setTimeout(() => messag.delete(), 2000));
            }
        }).catch(() => {
            message.delete();
            msg.channel.send("You took too long!")
                .then((m) => setTimeout(() => m.delete(), 2000));
        });

    }
}
