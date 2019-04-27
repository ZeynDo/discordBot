const Discord = require("discord.js");
const client = new Discord.Client();


const fs = require('fs');
let rawdata = fs.readFileSync('weapon.json');

let weapon = JSON.parse(rawdata);
let weapons = weapon["weapons"];
let members = {};

client.on("ready", () => {
    console.log("Connected as" + client.user.tag);

    client.user.setActivity("musik", { type: "LISTENING" });

    client.guilds.forEach((guild) => {
        console.log(guild.name)
        guild.channels.forEach((channel) => {
                console.log(` - ${channel.name} ${channel.type} ${channel.id} `);

            })
            //general channel Id: 530088760105369621
    })

    let generalChannel = client.channels.get("530088760105369621");

})

function getMessageSender(msg) {

    let user = msg.member
    user = user.toString();
    if (user.includes("!")) {
        user = user.split("!")[1].split(">")[0];
    } else {
        user = user.split("@")[1].split(">")[0];
    }
    return client.users.get(user).username + "#" + client.users.get(user).discriminator
}

client.on("message", msg => {

    if (msg.content === "baka") {
        msg.reply("..it´s..not like..I want you to call me baka..or anything..")

    }


    if (msg.content === "!getWeapon") {
        let senderName = getMessageSender(msg)
        if (members[senderName] == undefined) {
            let random = Math.floor(Math.random() * weapons.length)
            msg.reply("u got a mighty " + weapons[random]["name"])
            members[senderName] = weapons[random]
        } else {
            msg.reply("you already have a mighty " + members[senderName]["name"] + "!!!!")
        }
    }

    if (msg.content === "!attack") {
        let senderName = getMessageSender(msg)
        let channelMembers = Array.from(msg.member.guild.members)
        let random = Math.floor(Math.random() * channelMembers.length)

        if (members[senderName] == undefined) {
            msg.reply("you dont have a weapon , use !getWeapon first ")
        } else {
            let ownedWeapon = members[senderName]
            msg.reply("you went on a rampage with " + ownedWeapon["name"])

        }
    }
})

client.on("nessage", (receivedMessage) => {
    if (receivedMessage.author == client.user) {
        return
    }
})






client.login("YOUR BOT TOKEN COMES HERE");