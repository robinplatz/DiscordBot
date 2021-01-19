const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const fs = require('fs');
const { exit } = require('process');
var token;
try{
    token = fs.readFileSync('./token.txt').toString('utf-8');
}catch(err){
    console.log("token.txt with BlueBot token not found.");
}


client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./cmd/').filter(file => file.endsWith('.js'));
for (const file of commandFiles){
    const command = require(`./cmd/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready', () =>{
    console.log(`${client.user.tag} is online`);
});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        client.commands.get('help').execute(message, args);
    }
    
});

try{
    client.login(token);
}catch(err){
    console.log(err);
    exit();
}