import Client from '../Client';
import { ButtonInteraction } from 'discord.js';

interface Run {
	(client:Client, button:ButtonInteraction)
}

export interface Buttons {
	run: Run
}