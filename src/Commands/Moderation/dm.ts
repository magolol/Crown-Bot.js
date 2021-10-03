import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'dm',
    description: 'anonymously private DM someone',
    example: 'c.dm @AnnoyMe [Message]',
    public: true,
    aliases: [],
    run: async(client, msg, args) => {
        if (args.length < 2) return;
        if (!msg.member.roles.cache.has('832732240843636746')) return;
        const message = args.shift().toString().replace(/,/g, ' ');

        msg.channel.delete()
        .then(() => {
            msg.mentions.members.first().send(message)
            .then((messag) => {
                msg.channel.send("Done!")
                .then((m) => {
                    setTimeout(() => {
                        m.delete();
                    }, 4000);
                })
            })
            .catch((err) => {
                msg.channel.send("It seems like the person you're trying to DM has their DMs closed. imagine")
                .then((m) => {
                    setTimeout(() => {
                        m.delete();
                    }, 4000);
                })
                .catch((e) => {
                    console.error(e);
                });
            });
        });

    }
}
