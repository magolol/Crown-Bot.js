import { GuildMember } from 'discord.js';
import { createConnection } from 'mysql';
import { Events } from '../Interfaces';

export const event: Events = {
    "name": 'guildMemberUpdate',
    run: async (client, oldMember:GuildMember, newMember:GuildMember) => {
        // support role for boosters
        var BeforeHasSupporterRole = false;
        var AfterHasSupporterRole = false;

        oldMember.roles.cache.forEach((item) => {
            if ('661115568450961410' === item.id) BeforeHasSupporterRole = true;
        });

        newMember.roles.cache.forEach((item) => {
            if ('661115568450961410' === item.id) AfterHasSupporterRole = true;
        });

        const db = createConnection(client.config.dbAll);
        const query = `SELECT * FROM Boosters WHERE client_id = '${oldMember.user.id}'`;

        if (!BeforeHasSupporterRole && AfterHasSupporterRole) {
            
            db.connect((err) => {
                if (err) throw err;


                db.query(query, (err, result: any[]) => {
                    if (err) throw err;

                    if (result.length === 0) {
                        const query = `INSERT INTO Boosters VALUES ('${oldMember.user.id}', TRUE, FALSE, NULL, NULL, 1)`;
                        db.query(query, (err, result) => {
                            if (err) throw err;

                            console.log(`${oldMember.user.tag} has boosted the server!`);

                        });
                        db.destroy();
                    } else {
                        // When translating all commands is complete, here is where a feature will go
                        const query = `UPDATE Boosters SET currently_boosting = TRUE, months_boosted = months_boosted + 1 WHERE client_id = '${oldMember.user.id}'`;
                        db.query(query, (err, result) => {
                            if (err) throw err;

                            console.log(`${oldMember.user.tag} has boosted the server again!`);

                        });
                        db.destroy();
                    }
                    
                });

            });

        } else if (BeforeHasSupporterRole && !AfterHasSupporterRole) {
            db.connect((err) => {
                if (err) throw err;

                const query = `UPDATE Boosters SET currently_boosting = FALSE WHERE client_id = '${oldMember.user.id}'`;
                db.query(query, (err, result:any[]) => {
                    if (err) throw err;

                    console.log(`${oldMember.user.tag} stopped boosting the server! D:`);

                });

                db.destroy();

            });
        }

    }
}
