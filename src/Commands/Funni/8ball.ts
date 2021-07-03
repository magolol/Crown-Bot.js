import { Command } from '../../Interfaces';

export const command: Command = {
    name: '8ball',
    description: 'It\'s just like shaking an eightball!',
    public: true,
    aliases: ['eightball', '8', 'eight_ball'],
    example: 'c.8ball is sex pog?',
    run: async (client, msg, args) => {
        if (args.length <= 0) return;

        const choices = ['It is certain.',
            'It is decidedly so.',
            'I don\'t think anyone cares..',
            'Yes – definitely.',
            'You may rely on it.',
            'As I see it, yes.',
            'no lol.',
            'Outlook good.',
            'Yes.',
            'Signs point to yes.',
            'Reply hazy, try again.',
            'Ask again later.',
            'Better not tell you now.',
            'Cannot predict now.',
            'Concentrate and ask again.',
            'count on it.',
            'My reply is no.',
            'My sources say no.',
            'Outlook not so good.',
            'Very doubtful.'];
            msg.channel.send(`Question: \`${args.toString().replace(/,/g, ' ')}\`\nAnswer: \`${choices[Math.floor(Math.random() * choices.length)]}\``);
    }
}
