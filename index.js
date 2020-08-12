const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix

client.on('ready', () => {
  client.user.setStatus('online', "auk-?")
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
  
  if (msglow.includes(prefix)) {
   if (msglow.includes("invite")) {
   message.channel.send("https://discord.com/api/oauth2/authorize?client_id=743150383496429649&scope=bot&permissions=2048")
   } 
  }
})

client.login(process.env.token);
