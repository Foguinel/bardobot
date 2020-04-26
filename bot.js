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

	var embed = new Discord.MessageEmbed()
	.setAuthor("Ping?", client.user.avatarURL)
	.setColor(0x9932cc)
		
	const m = await message.channel.send({ embed });
	var embed = new Discord.MessageEmbed()
	.setAuthor("Conexão 📶", message.author.avatarURL)
	.addField("A minha latência é de", `${m.createdTimestamp - message.createdTimestamp}ms`)
	.setTimestamp()
	.setFooter(`${client.user.username}`, client.user.avatarURL)
	.setColor(0x9932cc)

	m.edit({embed});

    }

    if(command === "atributes" || command === "atributos"){

        if(!message.member.roles.cache.has('542864141921288193'))return;

        var value1 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)
        var value2 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)
        var value3 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)
        var value4 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)
        var value5 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)
        var value6 = Math.min(Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1)

        var embed = new Discord.MessageEmbed()

        .setAuthor("Atributos", message.author.avatarURL)
        .addField(`${value1}FOR`, `Modificador ${value1 - 10 / 2}`)
        .addField(`${value2}CON`, `Modificador ${value2 - 10 / 2}`)
        .addField(`${value3}DES`, `Modificador ${value3 - 10 / 2}`)
        .addField(`${value4}INT`, `Modificador ${value4 - 10 / 2}`)
        .addField(`${value5}SAB`, `Modificador ${value5 - 10 / 2}`)
        .addField(`${value6}CAR`, `Modificador ${value6 - 10 / 2}`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(0x9932cc)
        message.channel.send(embed)
    }

// }else{
// 		var embed = new Discord.RichEmbed()
//         .setAuthor("Oops!", client.user.avatarURL)
//         .addField("Parece que você não está no meu banco de dados, tente novamente. Caso não funcione, marque <@449940691045318656>")
// 		.setColor(0x9932cc)
// 		message.channel.send({embed})
//     }
    })//})
client.login(process.env.BOT_TOKEN)