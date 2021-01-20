//  prints out the bots functionality and command list
module.exports = {
    name: 'help',
    description: 'prints out my command list',
    execute(message) {
        const Discord = require('discord.js');
        var temp = global.helpContent.split('\n');
        temp.pop();
        const attachment = new Discord.MessageAttachment('./assets/img/rob64.png', 'rob64.png');
        const response = new Discord.MessageEmbed()
        .setTitle('BlueBot github')
        .setDescription('Full list of commands')
        .setURL('https://github.com/robinplatz/DiscordBot')
        .attachFiles(attachment)
        .setThumbnail('attachment://rob64.png')

        var fieldInput, name;

        for(const line of temp){
            fieldInput = line.split(' ');
            name = fieldInput[0];
            fieldInput.shift();
            fieldInput = fieldInput.join(' ');
            response.addField(name, fieldInput, true);
        }

        message.channel.send(response);
    },
};