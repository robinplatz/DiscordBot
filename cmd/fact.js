// retrieves random useless facts from https://uselessfacts.jsph.pl/
module.exports = {
    name: 'fact',
    description: 'prints a random useless fact',
    execute(message) {
        const https = require('https');
        const Discord = require('discord.js');
        const options = {
            hostname: 'uselessfacts.jsph.pl',
            path: '/random.json',
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
                .setDescription(fact.text);
                //.addField('source', (fact.source_url))

                message.channel.send(response);
            });
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    },
};