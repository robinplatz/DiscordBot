// wolfram alpha api calls, limited to 2000/month
// store your  personal Api access in id.json
module.exports = {
    name: 'ask',
    description: 'me any question, I will use wolfram alpha to attempt to answer it',
    execute(message, args) {
        const Discord = require('discord.js');
        const WolframAlphaAPI = require('wolfram-alpha-api');
        const waApi = WolframAlphaAPI(global.wolframAppID);


        waApi.getSimple(args.join(' ')).then((url) => {
            const image = url.split('data:image/gif;base64,');
            const imageStream = new Buffer.from(image[1], 'base64');
            const response = new Discord.MessageEmbed()
            .setTitle(args.join(' '))
            .attachFiles([{ name: 'result.png', attachment:imageStream }])
            .setImage('attachment://result.png');
            message.channel.send(response);
          }).catch((error) => {
              const response = new Discord.MessageEmbed()
              .setDescription('Wolfram|Alpha did not understand your input');
              message.channel.send(response);
          });
    },
};