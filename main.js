const Discord = require('discord.js');
const client = new Discord.Client();
global.prefix = '>';
const fs = require('fs');
const { exit } = require('process');

const data = JSON.parse(fs.readFileSync('id.json'));
global.discordToken = data.SecretKeys[0].id;
global.wolframAppID = data.SecretKeys[1].id;

client.commands = new Discord.Collection();

global.helpContent = '';

const commandFiles = fs.readdirSync('./cmd/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./cmd/${file}`);
    client.commands.set(command.name, command);
    helpContent += `${global.prefix}${command.name} ${command.description}\n`;
}

client.on('ready', () => {
    console.log(`${client.user.tag} is online`);
});


client.on('message', message =>{
    if(!message.content.startsWith(global.prefix) || message.author.bot) return;
    const args = message.content.slice(global.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(client.commands.get(command) != null) {
        client.commands.get(command).execute(message, args);
    }
});

try{
    client.login(global.discordToken);
}
catch(err) {
    console.log(err);
    exit();
}