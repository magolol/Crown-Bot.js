import { Message } from 'discord.js';
import { Command } from '../../Interfaces';

export const command: Command = {
    name: "ping",
    description: "does what it says",
    example: 'c.ping',
    public: true,
    aliases: ['delay'],
    run: async(client, msg, args) => {

        const m : Message = await msg.channel.send('Calculating ping... ⚙️');

        const outcomes = [
            "what, you think I'm in the mood to calculate the ping? No, cry about it.",
            `Latency is ${(Date.now() - msg.createdTimestamp)}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`
        ]

        setTimeout(() => {
            if (msg.author.id === '547971853990494208') {
                console.log("wiki detected")
                m.edit(`Latency is ${(Date.now() - msg.createdTimestamp) - 5000}ms\nAPI Latency is ${Math.round(client.ws.ping)}ms`)
            } else {
                m.edit(outcomes[Math.floor(Math.random() * outcomes.length)])
            }
        }, 5000)
    }
}
