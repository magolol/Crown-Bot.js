import { SlashCommand } from '../Interfaces';

export const slashCommand: SlashCommand = {
	run: async (client, interaction) => {
		if (interaction.guild.members.cache.get(interaction.user.id).roles.cache.has('643128678804619316')) {
			const person_to_send_msg_to = interaction.guild.members.cache.get(interaction.options.array()[0].user.id);

			person_to_send_msg_to.user.send({
				content: `A moderator from Switch n' Snap decided to anonymously dm you \`${interaction.options.array()[1].value.toString()}\``
			})
			.then(msg => {
				client.UpdateLog(`${interaction.user.tag} sent ${interaction.options.array()[0].user.tag} "${interaction.options.array()[1].value.toString()}"`);
				interaction.reply({
					content: "✅Succesfully sent!",
					ephemeral: true
				});
			})
			.catch(err => {
				interaction.reply({
					content: "The person you're trying to dm has their dms closed :c",
					ephemeral: true
				})
			});
		} else {
			interaction.reply({
				content: 'You must be staff to use this command!',
				ephemeral: true
			})
		}
	}
}
