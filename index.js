const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const ProfilePicture = 'https://cdn.discordapp.com/icons/699949542082215946/fa69e67567fe9f6276c27369d4f272e5.png?size=256'

client.on('ready', () => {
  client.user.setAvatar(ProfilePicture);
  client.user.setStatus('online', "auk-?")
  client.user.setPresence({
        game: {
            name: 'auk-?',
        }
    });
  console.log('I am ready!');
	
  function sendEmbedPlace(PlaceName,LinkTrello,EmbedThumbnail) {
  const Embed = new Discord.MessageEmbed()
	.setColor('#ffff00')
	.setTitle(PlaceName)
	.setURL(LinkTrello)
	.setDescription('Some description here')
	.setThumbnail(EmbedThumbnail)
	.setTimestamp()
	.setFooter('Aurelia Kingdom Bot', ProfilePicture);

channel.send(Embed);
}
});

client.on('message', message => {
  var sender = message.author.username;
  var msglow = message.content.toLowerCase();
  
  if (msglow.startsWith(prefix)) {
    var msgnow = msglow.slice(4)
    console.log(msgnow)
    switch(msgnow) {
      case "invite":
        message.channel.send("https://discord.com/api/oauth2/authorize?client_id=743150383496429649&scope=bot&permissions=281664")
        break;
      case "mob":
        sendEmbedPlace('Bank','https://trello.com/c/fctlOSPa/8-bank','https://trello-attachments.s3.amazonaws.com/5f05f0c02faa723bdddc7139/5f05fc69e1c2ab0eb87b554b/34718a0bd16c4691dd4c0e75dac0c3a0/2020-07-09_00.27.57.png');
        break;
      case "?":
        message.channel.send("coming soon")
        break;
      default:
        message.channel.send("oops, use auk-?")
    }
  }
})

client.login(process.env.token);
