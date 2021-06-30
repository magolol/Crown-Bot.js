import { TextChannel } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    "name": "delete",
    "description": "Delete an amount of messages from a channel",
    example: 'c.delete 69',
    public: true,
    "aliases": ["del", "purge"],
    run: async (client, msg, args) => {
        if (args.length === 0) {const amount: number = 2};
        if (!msg.member.permissions.has('MANAGE_MESSAGES')) return;

        var amount: number = parseInt((args[0] as string));
        
        if (msg.guild.members.cache.get(msg.author.id).permissions.has('MANAGE_MESSAGES')) {

            if (msg.channel.type === 'text') {
                const channel = msg.channel;
                channel.bulkDelete(amount)
                    .catch(err => {
                        channel.bulkDelete(2)
                            .catch(err => console.error(err));
                    });
            }

        } else {
            msg.channel.send("❌ You don't have permissions. ❌");
        }

    }
}
