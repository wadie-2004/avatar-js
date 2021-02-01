const Discord = require("discord.js");
const fs = require("fs");
var Jimp = require('jimp');
const config = require("./config.json");
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

client.on("message", (message) => {
    const args = message.content
    .slice(config.prefix.length)
    .trim()
    .split(/ +/g);

    if (!message.content.startsWith(config.prefix)) return;

    const cmd = args.shift().toLowerCase();

    if( cmd == "change" ){
        var sentimg = (message.attachments)
        if ( !sentimg.array()[0] ) return message.channel.send("No image specified");
        var xext = sentimg.array()[0].url.split(".")
        var ext = xext[xext.length-1]
    
        Jimp.read( sentimg.array()[0].url )
        .then(image => {
            image.greyscale().write('./images/last.'+ext);
            message.channel.send({
                files: ["./images/last."+ext]
            })
        })
        .catch(err => {
            message.channel.send(`Failed to greystyle the image\nError\n\`\`\`\n${err}\n\`\`\``)
        });
    }
});

client.login(config.token)