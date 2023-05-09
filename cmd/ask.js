// wolfram alpha api calls, limited to 2000/month
// store your  personal Api access in id.json
import Discord from 'discord.js';
import WolframAlphaAPI from 'wolfram-alpha-api';

export const name = 'ask';
export const description = 'use wolfram alpha api to answer your question';
export function execute(message, args) {

    const waApi = WolframAlphaAPI(global.wolframAppID);


    waApi.getSimple(args.join(' ')).then((url) => {
        const image = url.split('data:image/gif;base64,');
        const imageStream = new Buffer.from(image[1], 'base64');
        const response = new Discord.MessageEmbed()
            .setTitle(args.join(' '))
            .attachFiles([{ name: 'result.png', attachment: imageStream }])
            .setImage('attachment://result.png');
        message.channel.send(response);
    }).catch((error) => {
        const response = new Discord.MessageEmbed()
            .setDescription('Wolfram|Alpha did not understand your input');
        message.channel.send(response);
    });
};

export default {
    name,
    description,
    execute,
};