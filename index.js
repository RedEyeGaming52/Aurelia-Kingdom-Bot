const Discord = require('discord.js');
const client = new Discord.Client();
const Guild = new Discord.Guild();
const prefix = process.env.prefix
const fs = require('fs');
const place = require('./place.json')
const ProfilePicture = 'https://cdn.discordapp.com/icons/699949542082215946/fa69e67567fe9f6276c27369d4f272e5.png?size=128'

function sendEmbedPlace(PlaceName,LinkTrello,EmbedThumbnail,message) {
  const Embed = new Discord.MessageEmbed()
	.setColor('#ffff00')
	.setTitle(PlaceName)
	.setURL(LinkTrello)
   	.setImage(EmbedThumbnail)
	.setDescription('Some description here')
	.setTimestamp()
	.setFooter('Aurelia Kingdom Bot', ProfilePicture);

message.channel.send(Embed);
}
		
client.on('ready', () => {
  client.user.setAvatar(ProfilePicture).catch(err => console.log(err));
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
  if (msglow.startsWith(prefix)) {
    var msgnow = msglow.slice(4)
    if (msgnow == "invite") {
	    const InviteEmbed = new Discord.MessageEmbed()
		.setColor('#ffff00')
		.setTitle("Click this link")
		.setURL("https://discord.com/api/oauth2/authorize?client_id=743150383496429649&scope=bot&permissions=281664")
		.setTimestamp()
		.setFooter('Aurelia Kingdom Bot', ProfilePicture);
        	message.channel.send(InviteEmbed)
    } else if (msgnow.includes("place")) {
	    if (msgnow.includes("list")) {
		message.channel.send("coming soon")
	    } else {
	    	message.channel.send("the place name ?")
	    	const collectMessagePlace = new Discord.MessageCollector(message.channel,response => response.author.id == message.author.id, {time:10000});
	    	collectMessagePlace.once('collect', response => {
			msglow = response.content.toLowerCase();
			if (place[msglow] == undefined) {
				message.channel.send("Error : Place not found/nTry to use auk-place list instead")
				collectMessagePlace.stop();
			} else {
				sendEmbedPlace(place[msglow].name,place[msglow].trellolink,place[msglow].trellopic,message);
				collectMessagePlace.stop();
			}
		})
	    	collectMessagePlace.once('end', collected => {
			message.channel.send("I'm waiting for so long")
		})
	    }
    } else if (msgnow == "?" || msgnow == "help") {
	       message.channel.send("coming soon")
    } else {
		message.channel.send("oops, use auk-?")
    }
  }
})

client.login(process.env.token);
