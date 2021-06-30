import { Command } from '../../Interfaces';
import { MessageEmbed, User} from 'discord.js';
import { createConnection } from 'mysql';

export const command: Command = {
    "name": "balance",
    "description": "check the amount of money you have in your bank and wallet!",
    public: true,
    "aliases": ['bal', 'wallet', 'mon', 'money', 'monz', 'cash', 'dough', 'moolah', 'monies', 'monie'],
    example: 'c.balance',
    run: async (client, msg, args) => {
        const db = createConnection(client.config.dbEconomy);
        db.connect((err):void => {
            if (err) throw err;
            if (args.length > 0) {
                const other : User = msg.mentions.users.first();

                if (other) client.OpenAccount(other.id); else return;

                const sql = `SELECT wallet, bank FROM Economy WHERE client_id = '${other.id}'`;
                
                db.query(sql, (err, result: any[]):void => {
                    if (err) throw err;
                    const embed = new MessageEmbed()
                    .setColor(3066993)
                    .setTitle(`${other.username}'s amount of snips`)
                    .addField('in wallet', result[0].wallet)
                    .addField('in bank', result[0].bank)
                    .setFooter(`Command by ${msg.author.username}`, msg.author.avatarURL());
                    
                    msg.channel.send({embed: embed});
                    
                    db.destroy();
                });
            } 
            
            else {
                client.OpenAccount(msg.author.id);
                const sql = `SELECT wallet, bank FROM Economy WHERE client_id = '${msg.author.id}'`;


                db.query(sql, (err, result: any[]):void => {
                    if (err) throw err;

                    const embed = new MessageEmbed()
                        .setTitle(`${msg.author.username}'s amount of snips`)
                        .setColor(3066993)
                        .addField('in wallet', result[0].wallet)
                        .addField('in bank', result[0].bank)
                        .setFooter(`Command by ${msg.author.username}`, msg.author.avatarURL());

                        msg.channel.send({embed: embed});

                    db.destroy();
                });
            }
    });
}};
