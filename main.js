const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '!';

client.once('ready', () =>{
    console.log('SniffBot is online');
});


client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    
});

client.login('ODAwODY0OTMyNDI1MTA1NDA4.YAYVlw.b9HLnnYB2-LlSGmOBo9YmIA0IJs');