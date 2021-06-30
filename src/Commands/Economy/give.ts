import { User } from "discord.js";
import { createConnection } from "mysql";
import { Command } from "../../Interfaces";

export const command: Command = {
    "name": "give",
    "description": "Give some snips to your friends!",
    example: 'c.give @Wiki 69420',
    public: true,
    "aliases": [],
    run: async (client, msg, args) => {
        if (args.length <= 0) return;
        if (args.length === 1) return;

        client.OpenAccount(msg.author.id);

        const other: User = msg.mentions.users.first();
        const amount: number = parseInt((args[1] as string));

        if (typeof amount !== 'number') {
            const amount: number = parseInt((args[0] as string));
            if (typeof amount !== 'number') {
                return;
            }
        }

    if (typeof other === 'object') {

        client.OpenAccount(other.id);

        const db = createConnection(client.config.dbEconomy);

        db.connect((err) => {
            if (err) throw err;

            const query = `SELECT wallet FROM Economy WHERE client_id = '${msg.author.id}'`;
            db.query(query, (err, result) => {
                if (err) throw err;

                const wallet: number = result[0].wallet;
                
                if (amount === 0) {
                    msg.channel.send("you must input an ammount to give");
                    return;
                } else if (amount > wallet) {
                    msg.channel.send("sorry, but you don't have enough money");
                    return;
                } else if (amount < 0) {
                    msg.channel.send("did you just...try to give someone less than nothing?");
                }

                client.update_bank(msg.author.id, -1*amount, "wallet");
                client.update_bank(other.id, amount, "wallet");
                
                msg.channel.send(`sent ${amount} to ${other.tag}`);

                db.destroy();

            });

        });
    } else if (typeof other === 'undefined') {
            return;
    } else {
            console.error(`Could not detect type of other object in give.ts\nType: ${other}`)
        }
    }
}
