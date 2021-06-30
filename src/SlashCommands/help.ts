import { MessageEmbed } from 'discord.js';
import { join } from 'path';
import { readdir } from 'fs/promises';
import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (client, interaction) => {
		async function loopDir(dirname: string): Promise<string> {
			var final = '';
			const files = await readdir(dirname);
				files.forEach((file) => {
					if (file.endsWith('.ts') && !(file.endsWith('.d.ts'))) {
						const { command } = require(`${dirname}/${file}`)
						final += command.public ? `\`${file.replace('.ts', '')}\`, ` : ''
					}
				});
			return final.substring(0, final.length - 2);
		}

		const em = new MessageEmbed({
			title: 'Help menu',
			color: 3447003,
			fields: [
				{
					name: '**Economy**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Economy'))}`
				},
				{
					name: '**Funni**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Funni'))}`
				},
				{
					name: '**Gambling**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Gambling'))}`
				},
				{
					name: '**Images**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Images'))}`
				},
				{
					name: '**Misc**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Misc'))}`
				},
				{
					name: '**Moderation**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Moderation'))}`
				},
				{
					name: '**Tts**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Tts'))}`
				},
				{
					name: '**Wikipedia**',
					value: `${await loopDir(join(__dirname, '..', 'Commands', 'Wikipedia'))}`
				}
			],
			footer: { text: 'https://github.com/W1kipedia/SwitchBot.js' }
		});
		interaction.reply({
			embeds: [em],
			ephemeral: true
		})
	}
}
