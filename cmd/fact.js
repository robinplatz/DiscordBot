// retrieves random useless facts from https://uselessfacts.jsph.pl/
import https from 'https';
import Discord from 'discord.js';

export const name = 'fact';
export const description = 'prints a random useless fact';
export function execute(message) {
    const options = {
        hostname: 'uselessfacts.jsph.pl',
        path: '/api/v2/facts/random',
        method: 'GET',
    };

    const req = https.request(options, res => {
        console.log(`Fact request: statusCode: ${res.statusCode}`);
        let data = '';

        res.on('data', d => {
            data += d;
        });

        res.on('end', () => {
            let fact = JSON.parse(data);
            const response = new Discord.MessageEmbed()
                .setAuthor(`Useless fact for ${message.author.username}`)
                .setDescription(fact.text)
                //.addField('source', (fact.source_url))
                .setColor('RANDOM');

            message.channel.send(response);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.end();
};

export default {
    name,
    description,
    execute,
};