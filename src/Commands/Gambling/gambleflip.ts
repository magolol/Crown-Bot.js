import { Command } from '../../Interfaces';
import { createConnection } from 'mysql';

export const command: Command = {
    name: 'gambleflip',
    description: 'it\'s like coinflipping but gambling',
    example: 'c.gambleflip 69420',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        var denied = false;
        client.cooldowns.gambleflip.forEach((flipper) => {
            if (flipper === msg.author.id) {
                msg.channel.send("You've already gambleflipped today...")
                    .catch(err => console.error(err));
                denied = true;
            }
        });
        if (denied) return;
        if (args.length === 0) return;
        const amount = parseInt((args[0] as string))
        client.OpenAccount(msg.author.id);
        const choices = [true, false];

        const conn = createConnection(client.config.dbEconomy);

        conn.connect((err) => {
            if (err) throw err;

            if (choices[Math.floor(Math.random() * choices.length)]) {
                const earnings = amount*2;

                msg.channel.send(`You made ${earnings} snips!`)
                    .then(() => {
                        const q = `UPDATE Economy SET wallet = wallet + ${earnings} WHERE client_id = '${msg.author.id}'`;
                        conn.query(q, (err) => {if (err) throw err});
                    })
                    .catch(err => console.error(err));
            } else {
                const losings = Math.floor(Math.random() * 100);

                msg.channel.send(`You lost ${losings} snips`)
                    .then(() => {
                        const q = `UPDATE Economy SET wallet = wallet - ${losings} WHERE client_id = '${msg.author.id}'`;
                        conn.query(q, (err) => {if (err) throw err;})
                    })
                    .catch((err) => console.error(err))
            }
        })
        client.cooldowns.gambleflip.push(msg.author.id);
        setTimeout(() => {
            const location = client.cooldowns.gambleflip.indexOf(msg.author.id);
            if (location > -1) {
                client.cooldowns.gambleflip.splice(location, 1);
            }
        }, 86400000)
    }
}
