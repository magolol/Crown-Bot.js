import { Intents } from 'discord.js';
import Client from './Client';

const intents = new Intents(Intents.ALL)
const e = new Client({
    intents: intents
});e.init();
