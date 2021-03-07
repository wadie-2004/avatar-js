const Discord = require("discord.js");
const fs = require("fs");
const prefix = (".")
const Jimp = require('jimp');
const client = new Discord.Client();
const DIG = require("discord-image-generation");
const express = require("express");
const app = express()
app.listen(() => console.log("Server started"));

app.use('/', (req, res) => {
  res.send(new Date());
});
 
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag} `);
	var ms = 10000;
	client.user.setPresence({
		activity: { name: 'you new puury...', type: 'WATCHING' },
		status: 'idle'
	});
});
const canvacord = require("canvacord");
client.on("message",async msg => {
  if (msg.content.toLowerCase().startsWith(prefix + 'change')) {
    msg.delete({timeout: 300000})
    const imgURL = (msg.attachments.first() && msg.attachments.first().proxyURL) || (msg.mentions.users.first() && msg.mentions.users.first().displayAvatarURL({ format: "png", size: 2048 })) || msg.content.split(" ")[1];
    const attachment = await canvacord.Canvas.greyscale(imgURL || msg.author.displayAvatarURL({ format: "png", size: 2048 }));

    return msg.channel.send("***Changed;***", { files: [{ attachment, name: "change.png" }] }).then(msg => msg.delete({ timeout: 300000}))
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'edit')) {
    msg.delete({timeout: 300000})
    const imgURL = (msg.attachments.first() && msg.attachments.first().proxyURL) || (msg.mentions.users.first() && msg.mentions.users.first().displayAvatarURL({ dynamic: true, format: "png", size: 2048 })) || msg.content.split(" ")[1] || msg.author.displayAvatarURL({ dynamic: true, format: 'png' , size: 2048 });
    let img = await new DIG.Blur().getImage(imgURL,2);
    let attach = new Discord.MessageAttachment(img, "edit.png");
    msg.channel.send("***edit;***",attach).then(msg => msg.delete({ timeout: 300000}))
}
  if (msg.content.toLowerCase().startsWith(prefix + 'sepia')) {
    msg.delete({timeout: 300000})
    const imgURL = (msg.attachments.first() && msg.attachments.first().proxyURL) || (msg.mentions.users.first() && msg.mentions.users.first().displayAvatarURL({ dynamic: true, format: "png", size: 2048 })) || msg.content.split(" ")[1] || msg.author.displayAvatarURL({ dynamic: true, format: 'png' , size: 2048 });
    let img = await new DIG.Sepia().getImage(imgURL);
    let attach = new Discord.MessageAttachment(img, "Sepia.png");
    msg.channel.send("***Sepia;***",attach).then(msg => msg.delete({ timeout: 300000}))
 }

if(msg.content.toLowerCase().startsWith(prefix+"setname")||msg.content === prefix+"name"){
     if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR"))
return msg.channel.send("**Your Must Have ADMINISTRATOR Permission**")
if(!msg.guild.member(client.user).hasPermission("ADMINISTRATOR"))
return msg.channel.send("**I Must Have a ADMINISTRATOR Permission**")
    let args = msg.content.split(" ").slice(1).join(" ")
    if (!args) return
    client.user.setUsername(args)
    
msg.channel.send(`${client.user.username} name has been channged to **${args}**`)
}
 if(msg.content.toLowerCase().startsWith(prefix+"setavatar")){
     if(!msg.guild.member(msg.author).hasPermission("ADMINISTRATOR"))
return msg.channel.send("**Your Must Have ADMINISTRATOR Permission**")
if(!msg.guild.member(client.user).hasPermission("ADMINISTRATOR"))
return msg.channel.send("**I Must Have a ADMINISTRATOR Permission**")

    let args = msg.content.split(" ").slice(1).join(" ")
client.user.setAvatar(args)
msg.channel.send("Done | This is New Avatar bot")
}

if (msg.content.toLowerCase().startsWith(prefix + 'help')) {
msg.delete({timeout: 300000})
      if (msg.author.bot) return;
 
     return msg.author.send(`**${client.user.username}** command \n\n
**Filters:**\n\`${prefix}change\` - change the color to black and white\n\`${prefix}edit\` - add blur to the image\n\`${prefix}sepia\` - Adds color sepia on the picture\n
  
**Owner:**\n\`${prefix}setname <name>\` - sets the name of the bot\n\`${prefix}setavatar <url>\` - sets the avatar of the bot
\n
For additional help, contact **${msg.author.tag}**`).then(() =>
 msg.react("✔️")
).catch(err => 
msg.react("❌")
).then(msg => msg.delete({ timeout: 300000}))
  }
});
client.login("")
