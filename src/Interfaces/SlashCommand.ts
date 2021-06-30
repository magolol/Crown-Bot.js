import { CommandInteraction } from 'discord.js';
import Client from '../Client';

interface Run {
	(client:Client, interaction: CommandInteraction)
}

export interface SlashCommand {
	run: Run
}
