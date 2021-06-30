import Client from '../Client';
import { ClientEvents } from 'discord.js';

interface Run {
    (client: Client, ...args: any[])
}

export interface Events {
    name: keyof ClientEvents,
    run: Run
}
