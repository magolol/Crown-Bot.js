import { Buttons } from '../Interfaces';

export const Button: Buttons = {
	run: async (client, button) => {
		client.tempConfig.summaryPosition.forEach((result) => {
			if (result.id === button.user.id) {
				result.Position += 1;
				result.embed.setThumbnail(result.ImageArray[result.Position])
				console.log(result.ImageArray);
				result.interaction.editReply({
					content: "Don't worry if you get a \"This interaction failed\" warning when using buttons, it's normal",
					embeds: [result.embed],
					components: [
						{
							type: 1,
							components: [
								{
									type: 2,
									style: 1,
									label: 'Previous Image',
									customID: 'wikipedia_imageBack',
									disabled: false
								},
								{
									type: 2,
									style: 1,
									label: 'Next Image',
									customID: 'wikipedia_imageNext',
									disabled: result.Position === result.ImageArray.length ? true : false
								},
								{
									type: 2,
									label: 'View Full Page',
									style: 5,
									url: result.url
								}
							]
						}
					]
				})
			}
		})
	}
}