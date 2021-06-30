import { Command } from '../../Interfaces';
import { createConnection } from 'mysql';
import { GuildMember, MessageEmbed } from 'discord.js';

export const command: Command = {
    name: 'rob',
    description: "Rob someone that has at least 100 snips in their wallet, there's a risk though!",
    example: 'c.rob @urmumlol',
    public: true,
    aliases: [],
    run: async (client, msg, args) => {
        client.cooldowns.rob.forEach((robber) => {
            if (robber = msg.author.id) {
                msg.channel.send("You currently cannot rob anyone right now...")
                    .catch(err => console.error(err));
                return;
            }
        });

        if (args.length === 0) return;
        const victim: GuildMember = msg.mentions.members.first();
        if (typeof victim === 'undefined'){msg.channel.send('You must mention someone to rob 😐').catch((err) => console.error(err)); return;}

        client.OpenAccount(msg.author.id);
        client.OpenAccount(victim.user.id);
        const outcomes = [true, false];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        const conn = createConnection(client.config.dbEconomy);

        conn.connect((err) => {
            if (err) throw err;
            const q = `SELECT wallet FROM Economy WHERE client_id = '${victim.id}'`;

            conn.query(q, async (err, results:any[]) => {
                if (err) throw err;

                if (!(results.length === 0)) {
                    const earnings: number = Math.floor(Math.random() * results[0].wallet / 5);
                    if (outcome) {
                        const good_situations = [
                            `You tripped ${victim.user.username} and they dropped **${earnings}** snips, so you took it!`,
                            `You broke into ${victim.user.username}'s house and stoken **${earnings}** snips`,
                            `You politely asked ${victim.user.username} for snips, they said sure....you got **${earnings}** snips..?`
                        ]

                        const em = new MessageEmbed({
                            title: good_situations[Math.floor(Math.random() * good_situations.length)],
                            color: 3066993
                        })
                        msg.channel.send({embed: em})
                            .catch(err => console.error(err));
                        await client.update_bank(msg.author.id, earnings, 'wallet');
                        await client.update_bank(victim.id, -earnings, 'wallet');
                        client.cooldowns.rob.push(msg.author.id);
                        setTimeout(() => {
                            const location = client.cooldowns.rob.indexOf(msg.author.id);
                            if (location > -1) {
                                client.cooldowns.rob.splice(location, 1);
                            }
                        }, 43200000);
                    } else {
                        conn.query(`SELECT wallet FROM Economy WHERE clinet_id = '${msg.author.id}'`, async (err, e:any[]) => {
                            if (err) throw err;
                            const losses: number = Math.floor(Math.random() * e[0].wallet / 5);

                            const conseqeunce: number = Math.floor(Math.random() * losses)
                            const bad_situations = [
                                `You tripped ${victim.user.username} and they had zipper pockets so they dropped nothing, they got mad at you and asked for compensation. You gave them **${conseqeunce}** snips..`,
                                `You broke into ${victim.user.username}'s house and got caught, you had to pay **${losses}** snips...`,
                                `You polietly asked ${victim.user.username} for snips, they said no and asked you for snips...you lost **${conseqeunce}** snips...?`
                            ]
                            const em = new MessageEmbed({
                                title: bad_situations[Math.floor(Math.random() * bad_situations.length)],
                                color: 15158332
                            })
                            msg.channel.send({embed: em})
                                .catch(err => console.error(err));
                            await client.update_bank(msg.author.id, -conseqeunce, 'wallet');
                            await client.update_bank(victim.id, conseqeunce, 'wallet');
                            setTimeout(() => {
                                const location = client.cooldowns.rob.indexOf(msg.author.id);
                                if (location > -1) {
                                    client.cooldowns.rob.splice(location, 1);
                                }
                            }, 86400000);
                        });
                    }
                }
            });
        });
    }
}
