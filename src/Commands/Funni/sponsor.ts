import { Command } from "../../Interfaces";
import { readdir, readFile } from 'fs/promises';
import { join } from "path";

export const command: Command = {
	name: 'sponsor',
	description: "I would like to thank today's sponser",
	public: true,
	aliases: ['Sponser'],
	example: 'c.sponsor',
	run: async (client, msg, args) => {
		client.cooldowns.sponsor.forEach((id:string) => {
			if (id === msg.author.id) {
				msg.channel.send(`You're still on cooldown for ${(client.cooldowns.open_url[msg.author.id.toString()]) / (1000 * 60)} minutes!`)
			}
		})

		const Sponsorpath = join(__dirname, '..', '..', '..', 'sponsors')
		readdir(Sponsorpath)
			.then((files) => {
				const file = files[Math.floor(Math.random() * files.length)];
				readFile(`${Sponsorpath}/${file}`, 'utf8')
					.then((fileContents) => {
						msg.channel.send("Before we continue")
						setTimeout(() => {
							msg.channel.send("I would like to thanks today's sponsor...")
							setTimeout(() => {
								msg.channel.send(`__***${fileContents.toUpperCase()}***__`)
							}, 3000)
						}, 2000)
					})
					.catch(err => console.error(err))
			})
			.catch(err => console.log(err));

		client.cooldowns.sponsor.push(msg.author.id)
		setTimeout(() => {
			const location = client.cooldowns.sponsor.indexOf(msg.author.id);
			if (location > -1) {
				client.cooldowns.sponsor.splice(location, 1);
			}
		}, 86400000)
		// This is an entire day in milliseconds
	}
}
