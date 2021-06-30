import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'beg',
    description: 'Beg for money and someone might give you something👀',
    public: true,
    example: 'c.beg',
    aliases: [],
    run: async (client, msg, args) => {
        client.cooldowns.beg.forEach((begger) => {
            if (begger === msg.author.id) {
                msg.channel.send("you feel like a dumbass for asking again")
                .catch(err => console.error(err))
                return;
            }
        });
        await client.OpenAccount(msg.author.id);

        const outcomes = [true, false]
        const outcome: boolean = outcomes[Math.floor(Math.random() * outcomes.length)];

        if (outcome) {
            const earnings: number = Math.floor(Math.random() * 420)
            msg.reply(`someone took pity for you and gave you ${earnings} snips`)
            .then(() => {
                client.update_bank(msg.author.id, earnings)
                .catch((err) => {
                    throw new Error(err);
                });
            })
            .catch((err) => {
                console.error(err);
            })
        } else {
            msg.reply('after begging you weren\'t able to get any money 😔')
            .catch((err) => {
                console.error(err);
            })
        }
        client.cooldowns.beg.push(msg.author.id);
        setTimeout(() => {
            const location = client.cooldowns.open_url.indexOf(msg.author.id);
            if (location > -1) {
                client.cooldowns.open_url.splice(location, 1);
            }
        }, 86400000)
    }
}
