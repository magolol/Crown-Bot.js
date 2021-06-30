import { createConnection } from "mysql";
import { Command } from "../../Interfaces";

export const command: Command = {
    "name": "withdraw",
    "description": "withdraw snips from your bank!",
    example: 'c.withdraw 69420',
    public: true,
    "aliases": [],
    run: async (client, msg, args) => {
        if (args.length <= 0) return;
        if (args.length >= 2) return;

        client.OpenAccount(msg.author.id);
        const amount: number = parseInt((args[0] as string));

        if (typeof amount !== 'number') {
            const amount: number = parseInt((args[0] as string));
            if (typeof amount !== 'number') {
                return;
            }
        }

        if (amount <= 0) {
            msg.channel.send("you cannot withdraw 0 or lower amount of snips");
            return;
        }

        const db = createConnection(client.config.dbEconomy);
        
        db.connect((err) => {
            if (err) throw err;
            
            const query = `SELECT wallet, bank FROM Economy WHERE client_id = '${msg.author.id}'`;

            db.query(query, (err, result) => {

                const wallet: number = result[0].wallet;
                const bank: number = result[0].bank;

                if (amount > bank) {
                    msg.channel.send("sorry, but you dont' have enough money")
                    db.destroy();
                    return;
                }

                client.update_bank(msg.author.id, amount, "wallet");
                client.update_bank(msg.author.id, -1*amount, "bank");

                msg.channel.send(`you withdrew ${amount} snips!`);

                db.destroy();
            });

        });
    }
}
