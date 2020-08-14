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

/*function collectMessage(type,msg) {
  const collectormessage = new Discord.MessageCollector(msg.channel, m => m.author.id == msg.author.id, { time: 100 });
        collectormessage.on('collect', message => {
		var msglow = message.content.toLowerCase();
        	if ([type][msglow] == undefined) {
			message.channel.send("error 404 : not found!")
			collectormessage.stop();
        	} else {
			return msglow;
		}
	})
}*/
		
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
    console.log(msgnow)
    if (msgnow.includes("invite")) {
	    const InviteEmbed = new Discord.MessageEmbed()
		.setColor('#ffff00')
		.setTitle("Click this link")
		.setURL("https://discord.com/api/oauth2/authorize?client_id=743150383496429649&scope=bot&permissions=281664")
		.setTimestamp()
		.setFooter('Aurelia Kingdom Bot', ProfilePicture);
        	message.channel.send(InviteEmbed)
    } else if (msgnow.includes("place")) {
	    	message.channel.send("the place name ?")
	    	const collectMessagePlace = new Discord.MessageCollector(message.channel,response => response.author.id == message.author.id, {time:100000});
	    	collectMessagePlace.once('collect', response => {
			msglow = response.content.toLowerCase
			if (place[msglow] == undefined) {
				message.channel.send("Error : Place not found")
			} else {
				sendEmbedPlace(place[msglow].name,place[msglow].trellolink,place[msglow].trellopic,message);
			}
		})
    } else if (msgnow == "?") {
	       message.channel.send("coming soon")
    } else {
		message.channel.send("oops, use auk-?")
    }
  }
})

client.login(process.env.token);
