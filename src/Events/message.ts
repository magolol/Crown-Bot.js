import { Events, Command } from '../Interfaces'
import { Message } from 'discord.js';

export const event: Events = {
    name: 'message',
    run: async (client, msg: Message) => {
        if (!msg.guild) return; 
        if (msg.author.bot) return;
        if (msg.content.toLowerCase().startsWith('<@!859897941632483338>')) msg.channel.send('Use `c.help` to see all the commands!').catch(err => console.error(err));
        if (!msg.content.toLocaleLowerCase().startsWith(client.config.prefix))  return;
        
        const args = msg.content
            .slice(client.config.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift().toLocaleLowerCase();
        if(!cmd) return;
        const command = client.commands.get(cmd) || client.aliases.get(cmd);
        if (command) (command as Command).run(client, msg, args);
    }
}