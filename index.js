const Discord = require("discord.js");
const fs = require("fs");
const prefix = "."
var Jimp = require('jimp');
var client = new Discord.Client();
const DIG = require("discord-image-generation");
const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/', (req, res) => {
  res.send(new Date());
});

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag} `);
	var ms = 10000;
	client.user.setPresence({
		activity: { name: 'ohh, Now you are in Çukur....', type: 'WATCHING' },
		status: 'idle'
	});
});
const canvacord = require("canvacord");
client.on("message",async msg => {
  if (msg.content.toLowerCase().startsWith(prefix + 'change')) {
    msg.delete({timeout: 300000})
    const imgURL = (msg.attachments.first() && msg.attachments.first().proxyURL) || (msg.mentions.users.first() && msg.mentions.users.first().displayAvatarURL({ format: "png", size: 2048 })) || msg.content.split(" ")[1];
    const attachment = await canvacord.Canvas.greyscale(imgURL || msg.author.displayAvatarURL({ format: "png", size: 2048 }));

    return msg.channel.send("***Changed:***", { files: [{ attachment, name: "change.png" }] }).then(msg => msg.delete({ timeout: 300000}))
  }
  if (msg.content.toLowerCase().startsWith(prefix + 'edit')) {
    msg.delete({timeout: 300000})
    const imgURL = (msg.attachments.first() && msg.attachments.first().proxyURL) || (msg.mentions.users.first() && msg.mentions.users.first().displayAvatarURL({ dynamic: true, format: "png", size: 2048 })) || msg.content.split(" ")[1] || msg.author.displayAvatarURL({ dynamic: true, format: 'png' , size: 2048 });
    let img = await new DIG.Blur().getImage(imgURL);
    let attach = new Discord.MessageAttachment(img, "edit.png");
    msg.channel.send("***edit***",attach).then(msg => msg.delete({ timeout: 300000}))
}

});
client.login("")
