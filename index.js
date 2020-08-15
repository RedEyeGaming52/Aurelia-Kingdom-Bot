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

const HelpEmbed = new Discord.MessageEmbed()
	.setColor('#ffff00')
	.setTitle('Aurelia Kingdom Bot')
	.setAuthor('Aurelia Kingdom Bot', ProfilePicture, 'https://discord.gg/ffjNRpm')
        .addFields(
		{ name: 'Command List', value: 'Aurelia Kingdom Bot Command List' },
		{ name: '\u200B', value: '\u200B' },
	        { name: 'Places', value: '**auk-place**/n ```Usage: auk-place, and type the places name```/n **auk-place list**/n ```To see places list```', inline: true },
	)
	.setTimestamp()
	.setFooter('Aurelia Kingdom Bot', ProfilePicture);
		
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
		msglow = "";
		var array = Object.keys(place);
		for (var key in array) {
			msglow = msglow.concat("- "+array[key]+"\n")
		}
		message.channel.send("List tempat :\n```"+msglow+"```");
	    } else {
	    	message.channel.send("the place name ?")
	    	const collectMessagePlace = new Discord.MessageCollector(message.channel,response => response.author.id == message.author.id, {time:10000});
	    	collectMessagePlace.once('collect', response => {
			msglow = response.content.toLowerCase();
			if (place[msglow] == undefined) {
				if (msglow == "auk-place") {
				} else {
					message.channel.send("Error : Place not found\nTry to use auk-place list instead")
					collectMessagePlace.stop();	
				}
			} else {
				sendEmbedPlace(place[msglow].name,place[msglow].trellolink,place[msglow].trellopic,message);
			}
		})
	    }
    } else if (msgnow == "?" || msgnow == "help") {
	       message.channel.send(HelpEmbed)
    } else {
		message.channel.send("oops, use auk-?")
    }
  }
})

client.login(process.env.token);
