const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
// const firebase = require("firebase");

// firebase.initializeApp(config.sql);
// const database = firebase.database()

client.on("ready", async => {
	console.log("Howdy!")
})

client.on("message", async message => {
    if(message.author.bot || message.author.id == client.user.id) return;

	if(message.content.indexOf(config.prefix) !== 0) return;
	const arg = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = arg.shift().toLowerCase();
    
    const mestre = message.guild.roles.get("542864141921288193")
    
    	// Firebase

    // global.anotacoes = '';
    // global.magias = '';

	// database.ref(`User/${message.author.id}`)
	// .once('value').then(async function(snap) {

	// if(snap.val() !== null){

    // database.ref(`User/${message.author.id}`)
	// .set({
    //     anotacoes: anotacoes,
    //     magias: magias
	// })

	// var embed = new Discord.RichEmbed()
	// .setAuthor("Você foi registrado com sucesso!", client.user.avatarURL)
	// .setColor(0x9932cc)
	// message.channel.send({embed})

	if(command === "ping" || command === "ms"){
		if(message.author.id !== 449940691045318656)return;

	var embed = new Discord.RichEmbed()
	.setAuthor("Ping?", client.user.avatarURL)
	.setColor(0x9932cc)
		
	const m = await message.channel.send({ embed });
	var embed = new Discord.RichEmbed()
	.setAuthor("Conexão 📶", message.author.avatarURL)
	.addField("A sua latência é de", `${m.createdTimestamp - message.createdTimestamp}ms`)
	.addField("A minha latência é de", `${Math.round(client.ping) -3}ms`)
	.setTimestamp()
	.setFooter(`${client.user.username}`, client.user.avatarURL)
	.setColor(0x9932cc)

	m.edit({embed});

    }

    if(command === "alojorge"){
        var embed = new Discord.RichEmbed()
        .setAuthor("Falta de permissão", message.author.avatarURL)
        .addField("Você não é mestre! grr", `${m.createdTimestamp - message.createdTimestamp}ms`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(0x9932cc)
        if(!message.member.roles.has(mestre))return message.channel.send({embed})
        var embed = new Discord.RichEmbed()
        .setAuthor("Anawnwanwanaw", message.author.avatarURL)
        .addField("Você é mestre! <3", `${m.createdTimestamp - message.createdTimestamp}ms`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(0x9932cc)
        message.channel.send({embed})
    }

// }else{
// 		var embed = new Discord.RichEmbed()
//         .setAuthor("Oops!", client.user.avatarURL)
//         .addField("Parece que você não está no meu banco de dados, tente novamente. Caso não funcione, marque <@449940691045318656>")
// 		.setColor(0x9932cc)
// 		message.channel.send({embed})
//     }
    })//})
client.login(config.token)