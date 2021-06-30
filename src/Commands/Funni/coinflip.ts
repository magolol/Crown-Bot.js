import { Command } from '../../Interfaces';

export const command: Command = {
    name: 'coinflip',
    public: true,
    description: 'Flip a coin!',
    aliases: [],
    example: 'c.coinflip',
    run: async (client, msg, args) => {
        const choice = [
            'Heads!',
            'Tails'
        ];
        const outcome = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, ]

        msg.channel.send({
            content: outcome[Math.floor(Math.random() * outcome.length)] ? choice[Math.floor(Math.random() * choice.length)] : 'lol it landed in the middle'
        })
    }
}
