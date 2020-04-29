const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const firebase = require("firebase");

var firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: "bardobot-95b48.firebaseapp.com",
    databaseURL: "https://bardobot-95b48.firebaseio.com",
    projectId: "bardobot-95b48",
    storageBucket: "bardobot-95b48.appspot.com",
    messagingSenderId: "138235810031",
    appId: "1:138235810031:web:31e832b929c3ce5afa0b1a",
    measurementId: "G-JT87FS6E7Z"
  };
firebase.initializeApp(firebaseConfig);
const database = firebase.database()

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

    global.magias = '';

    global.display = '';
    global.mana = '';
    global.description = '';

    database.ref(`Spell/${arg}`)
	.once('value').then(async function(snap) {

    if(command === "addspell"){
         if(!message.member.roles.cache.get('542864141921288193'))return;

        const requisitos = [`Defina o ID da magia`, `Defina o nome da magia`, `Defina a mana da magia`, `Descreva a magia`]

        var embed = new Discord.MessageEmbed()
	    .setAuthor(`Criando uma magia...`)
	    .setTitle(requisitos[0])
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)

        const m = await message.channel.send(embed);

        const filter = msg => msg.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 720 * 1000 });

        const respostas = [];

        collector.on('collect', msg => {
        respostas.push(msg.content);
        requisitos.shift();
        if (requisitos.length <= 0) return collector.stop('done');

        var embed = new Discord.MessageEmbed()
	    .setAuthor(`Criando uma magia...`)
	    .setTitle(requisitos[0])
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)

        m.edit(embed).catch(error => {
            console.error(error);
            collector.stop();
        });
        });

        collector.on('end', (collected, reason) => {

        database.ref(`Spell/${respostas[0].toLowerCase()}`)
        .set({
            display: respostas[1],
            mana: respostas[2].replace(/\D/g, ""),
            description: respostas[3]
        })

        var embed = new Discord.MessageEmbed()
	    .setAuthor(`${respostas[1]}`)
        .addField(`ID`, `${respostas[0]}`)
        .addField(`Nome`, `${respostas[1]}`)
        .addField(`Mana`, `${respostas[2].replace(/\D/g, "")}EM`)
        .addField(`Descrição`, `${respostas[3]}`)
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)

	    m.edit(embed);
        });
    }

    if(command === "spell"){

        var ID = arg[0]

        database.ref(`Spell/${ID}`)
        var Display = snap.val().display
        var Mana = snap.val().mana
        var Description = snap.val().description

        var embed = new Discord.MessageEmbed()
	    .setAuthor(`${Display}`)
        .addField(`ID`, `${ID}`)
        .addField(`Nome`, `${Display}`)
        .addField(`Mana`, `${Mana}EM`)
        .addField(`Descrição`, `${Description}`)
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)

        message.channel.send(embed);

    }})

	database.ref(`User/${message.author.id}`)
	.once('value').then(async function(snap) {

	if(snap.val() !== null){

    database.ref(`User/${message.author.id}`)
	.set({
        magias: magias
	})

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
        let pc
        let pp
        let pe
        let po
        let pl

        if(pecas == "c"){
            pc = moedas
            pp = moedas / 10
            pe = moedas / 50
            po = moedas / 100
            pl = moedas / 1000
        }
        if(pecas == "p"){
            pc = moedas * 10
            pp = moedas 
            pe = moedas / 5
            po = moedas / 10
            pl = moedas / 100
        }
        if(pecas == "e"){
            pc = moedas * 50
            pp = moedas * 5
            pe = moedas 
            po = moedas / 2
            pl = moedas / 20
        }
        if(pecas == "o"){
            pc = moedas * 100
            pp = moedas * 10
            pe = moedas * 2
            po = moedas
            pl = moedas / 10
        }
        if(pecas == "l"){
            pc = moedas * 1000
            pp = moedas * 100
            pe = moedas * 20
            po = moedas * 10
            pl = moedas
        }

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

    if(command === "feedback" || command === "feed" || command === "bug"){
        var text = arg.join(" ")
        var nota = arg[0]
        var nota = nota.replace(/\D/g, "");
        if(!nota)return;
        var avaliacao = text.substr(text.indexOf(" ") + 1);
        if(!avaliacao)avaliacao = "Sem motivo"

        var creator = client.users.cache.get("449940691045318656")

        var embed = new Discord.MessageEmbed()

        .setAuthor(`Avaliação de ${message.author.username}`, message.author.avatarURL)
        .addField(`Nota`, `${nota}`)
        .addField(`Motivo`, `${avaliacao}`)
        .setTimestamp()
        .setFooter(`${client.user.username}`, client.user.avatarURL)
        .setColor(color)
        creator.send(embed)
    }

    if(command === "addnote"){
        database.ref(`User/${message.author.id}/Notes`)
        var name = arg

        var embed = new Discord.MessageEmbed()
	    .setAuthor("Adicionando nota...", message.author.avatarURL)
	    .setTitle("Escreva o que você quer anotar")
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)
        
        const m = await message.channel.send(embed);

        const filter = msg => msg.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 1800 * 1000 });

        const nota = [];

        collector.on('collect', msg => {
        nota.push(msg.content)
        if(msg.content)return collector.stop('done');

        });

        collector.on('end', (collected, reason) => {

        database.ref(`User/${message.author.id}/Notes/${name}`)
        .set({
            text: nota[0]
        })

        var embed = new Discord.MessageEmbed()
	    .setAuthor(`${name}`)
        .setDescription(`${nota[0]}`)
	    .setTimestamp()
	    .setFooter(`${client.user.username}`, client.user.avatarURL)
	    .setColor(color)

	    m.edit(embed);
        });

    }


    // if(command){
    //     if(snap.val() !== null)return;
	// 	var embed = new Discord.MessageEmbed()
    //     .setAuthor("Oops!", client.user.avatarURL)
    //     .addField("Parece que você não está no meu banco de dados, tente novamente. Caso não funcione, marque <@449940691045318656>")
	// 	.setColor(0x9932cc)
    //     message.channel.send({embed})

    //     database.ref(`User/${message.author.id}`)
    //     .set({
    //         magias: 0
    //     })

    //     }
    }})
    })
client.login(process.env.BOT_TOKEN)