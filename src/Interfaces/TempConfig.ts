import { CommandInteraction, MessageEmbed } from 'discord.js';

type MessageInfo = {
	interaction?: CommandInteraction,
	embed?: MessageEmbed,
	Position?: number,
	ImageArray?: string[],
	url?: string,
	id: `${bigint}`
}

export interface TempConfig {
	agreedToOpenUrl: boolean,
	summaryPosition?: MessageInfo[]
}