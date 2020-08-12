const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();

client.on('ready', () => {
  client.user.setStatus('online', "n-help")
  client.user.setPresence({
        game: {
            name: 'auk-?',
        }
    });
  console.log('I am ready!');
});

client.on('message', message => {
  var sender = message.author.username;
  var msglow = message.content.toLowerCase();
  
})

client.login(process.env.token);
