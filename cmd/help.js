//  prints out the bots functionality and command list
module.exports = {
    name: 'help',
    description: 'prints out the bots functionality and command list',
    execute(message) {
        message.channel.send('!ask any question');
    },
};