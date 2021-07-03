import { Events } from '../Interfaces';

export const event: Events = {
    name: 'ready',
    run: async (client) => {
        console.log(`${client.user.tag} is online`);
        var e = true;
        setInterval(() => {
            if (e) {
                // client.user.setPresence({status: 'online', activities: [{name: "V1.0.1", type: "PLAYING"}}]);
                client.user.setPresence({status: 'online', activities: [{name: "V0.1", type: "PLAYING"}]});
                e = false;
            } else {
                client.user.setPresence({status: 'online', activities: [{name: "thanks to wiki for help with the project. it would not have happened otherwise", type: "PLAYING"}]});
                e = true;
            }
        }, 6000)
    }
};
