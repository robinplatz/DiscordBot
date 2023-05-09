import Discord from 'discord.js';
const intents = new Discord.Intents(32767);
export const client = new Discord.Client({ intents });
global.prefix = '>';
import { readFileSync, readdirSync } from 'fs';
import { exit } from 'process';
const data = JSON.parse(readFileSync('id.json'));
global.discordToken = data.SecretKeys[0].id;
global.wolframAppID = data.SecretKeys[1].id;

client.commands = new Discord.Collection();
global.helpContent = '';

import help from './cmd/help.js';
import fact from './cmd/fact.js';
import ask from './cmd/ask.js';
import market from './cmd/market.js';

const commandFiles = readdirSync('./cmd/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    let command;
    switch (file) {
        case 'help.js':
            command = help;
            break;
        case 'fact.js':
            command = fact;
            break;
        case 'ask.js':
            command = ask;
            break;
        case 'market.js':
            command = market;
            break;
        default:
            console.log('unknown command');
            exit(1);
    }
    client.commands.set(command.name, command);
    helpContent += `${global.prefix}${command.name} ${command.description}\n`;
}
// console.log(client.commands);

let refreshMarketIntervall = 120000;

client.on('ready', () => {
    console.log(`${client.user.tag} is online`);
});


client.on('message', message =>{
    if(!message.content.startsWith(global.prefix) || message.author.bot) return;
    const args = message.content.slice(global.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log('cmd:', command, 'args:', args, `asked in ${message.guild.name}:${message.channel.name} by ${message.author.username} at ${new Date().toLocaleTimeString()}`);
    if(client.commands.get(command) != null) {
        if(command === 'market') {
            console.log('start listening to market registration queue');
            setInterval(() => execute(message), refreshMarketIntervall);
        } else {
            client.commands.get(command).execute(message, args);
        }
    }
});

try{
    client.login(global.discordToken);
}
catch(err) {
    console.log(err);
    exit();
}