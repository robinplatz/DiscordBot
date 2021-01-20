// retrieves random useless facts from https://uselessfacts.jsph.pl/
module.exports = {
    name: 'fact',
    description: 'prints a random useless fact',
    execute(message) {
        const https = require('https');
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
                message.channel.send(JSON.parse(data).text);
            });
        });

        req.on('error', error => {
            console.error(error);
        });

        req.end();
    },
};