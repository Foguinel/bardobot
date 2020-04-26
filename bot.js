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

    let color = `0x${message.member.displayHexColor}`;
    if (color == '0x000000') color = message.member.hoistRole.hexColor;
    
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
	.setColor(color)
		
	const m = await message.channel.send({ embed });
	var embed = new Discord.MessageEmbed()
	.setAuthor("Conexão 📶", message.author.avatarURL)
	.addField("A minha latência é de", `${m.createdTimestamp - message.createdTimestamp}ms`)
	.setTimestamp()
	.setFooter(`${client.user.username}`, client.user.avatarURL)
	.setColor(color)

	m.edit({embed});

    }

    if(command === "atributes" || command === "atributos"){

        if(!message.member.roles.cache.has('542864141921288193'))return;

        //1- 4 valores de 1 a 6
        //2- somar todos
        //3- pegar os valores de 1- e verificar o menor
        //4- pegar o valor de 2- e subtrair pelo valor de 3-
        
        function randomic() {
            var v1 = (Math.floor(Math.random() * 6) + 1)
            var v2 = (Math.floor(Math.random() * 6) + 1)
            var v3 = (Math.floor(Math.random() * 6) + 1)
            var v4 = (Math.floor(Math.random() * 6) + 1)
            var total = v1 + v2 + v3 + v4
            var min = Math.min(v1, v2, v3, v4)
            var value = total - min
            return value;
        }

        function modifier(s){
            if(s == 1) return -5;
            if(s == 2 || s == 3) return -4;
            if(s == 4 || s == 5) return -3;
            if(s == 6 || s == 7) return -2;
            if(s == 8 || s == 9) return -1;
            if(s == 10 || s == 11) return 0;
            if(s == 12 || s == 13) return 1;
            if(s == 14 || s == 15) return 2;
            if(s == 16 || s == 17) return 3;
            if(s == 18 || s == 19) return 4;
            if(s == 20 || s == 21) return 5;
            if(s == 22 || s == 23) return 6;
            if(s == 24 || s == 25) return 7;
            if(s == 26 || s == 27) return 8;
            if(s == 28 || s == 29) return 9;
            if(s == 30) return -10;
        }

        
        var value1 = randomic()
        var value2 = randomic()
        var value3 = randomic()
        var value4 = randomic()
        var value5 = randomic()
        var value6 = randomic()

        var embed = new Discord.MessageEmbed()

        .setAuthor("Atributos", message.author.avatarURL)
        .addField(`${value1}FOR`, `Modificador ${modifier(value1)}`)
        .addField(`${value2}CON`, `Modificador ${modifier(value2)}`)
        .addField(`${value3}DES`, `Modificador ${modifier(value3)}`)
        .addField(`${value4}INT`, `Modificador ${modifier(value4)}`)
        .addField(`${value5}SAB`, `Modificador ${modifier(value5)}`)
        .addField(`${value6}CAR`, `Modificador ${modifier(value6)}`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(color)
        message.channel.send(embed)
    }

    if(command === "converter"){
        var argument = arg[0]
        var pecas = argument[argument.length -1];
        var moedas = argument.replace(/\D/g, "");

        if(pecas == "c")moedas = moedas/ 1000
        if(pecas == "p")moedas = moedas / 100
        if(pecas == "e")moedas = moedas / 50
        if(pecas == "o")moedas = moedas / 10
        if(pecas == "l")moedas = moedas 

        let pc = moedas
        let pp = moedas * 10
        let pe = moedas * 50
        let po = moedas * 100
        let pl = moedas * 1000
        var embed = new Discord.MessageEmbed()

        .setAuthor("Conversão de moedas", message.author.avatarURL)
        .addField(`Valor inicial`, `${argument}`)
        .addField(`Peças de cobre`, `${pc}`)
        .addField(`Peças de prata`, `${pp}`)
        .addField(`Peças de electro`, `${pe}`)
        .addField(`Peças de ouro`, `${po}`)
        .addField(`Peças de platina`, `${pl}`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(color)
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