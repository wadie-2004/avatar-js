const Discord = require("discord.js");
const fs = require("fs");
var Jimp = require('jimp');
var client = new Discord.Client();
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
		activity: { name: 'Héllo Çukur.', type: 'WATCHING' },
		status: 'idle'
	});
});

const canvacord = require('canvacord')
client.on("message", async msg => {
    if (msg.content === ".change") {
        let img;
        if (msg.attachments.size > 0) {
            img = msg.attachments.first().url
        } else {
            img = msg.author.displayAvatarURL({
                format: 'png',
                size: 1024
            })
        }
        const image = await canvacord.Canvas.greyscale(img);
        const attachment = new Discord.MessageAttachment(image, "greyscale.png");
        return msg.channel.send(attachment);
    }
});
client.login("")
