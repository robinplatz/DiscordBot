//prints out the bots functionality and command list
module.exports = {
    name: 'help',
    description: 'prints out the bots functionality and command list',
    execute(message, args){
        message.channel.send('List of commands todo');
    }
}