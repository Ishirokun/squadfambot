const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs")
const prefix = "!";
var http = require('http');
const token = process.env.token;
const pg = require('pg');
const database = new pg.Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: true
	});

bot.on("ready", () => {
  console.log("The bot has started.");
  bot.user.setPresence({
        game: {
            name: 'with ONII-CHAAAAAAN',
        }
    });
	database.connect( (err, client, done) => {
            client.query('create table if not exists users( \
                id text primary key, \
                name text, \
                count integer default 0)', (err, result) => {
                    done(err);
            });
    });
});

bot.on("message", (message) => {
  if(message.author.bot) return;
  if (message.content.startsWith('- *** Would you rather? *** -')&&message.author.id == 258247247987212288){
      message.react("⬅")
      setTimeout(function(){
message.react("➡")
      }, 1000) 
    return;
  }  
});  

bot.on("message", (message) => {
  if(message.author.bot) return;
  let name = bot.users.get(message.author.id).username;
	console.log(message.author + '-' + name + '- "' + message.content + '"');
//  if(message.member.roles.has(371459491583098891)) return;
   if (!message.content.startsWith(prefix) || message.author.bot) return;
   const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
   if(command === "say")
   {
  let text = args.slice(0).join(" ");
  message.delete();
  message.channel.send(text);
}

  if(command === "sayt")
   {
     if (!message.guild == null) return;
    let text = args.slice(0).join(" ");
     message.delete()
     bot.channels.get("368435981256491019").send(text)
   }

  if (command === "purge") {
    if (message.author.id != 258247247987212288) return;
    message.channel.fetchMessages({limit:100}).then(collected => {
    collected.forEach(msg => {
    if (msg.author.id == 406474590681038849) msg.delete()
  });
});
    message.channel.send('Deleted messages of the bot in the last 100 messages.')
    message.delete()
    message.channel.fetchMessages({limit:1}).then(collected => {
    collected.forEach(msg => {
    if (msg.author.id == 406474590681038849) msg.delete()
        });
      });
  };
  
  if (command === "avatar") {
       let x = args[0].replace(/<@|>|!/g,"") 
	      if (x == null) return; 
     message.channel.send(bot.users.get(x).avatarURL)
    return;
  };
  

  if (command === "help"){
  };
     
});  

function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

bot.on("message", (message) => {
	if(message.author.bot) return;
	let name = bot.users.get(message.author.id).username;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if (command === 'o' || 'omegalul')
	{
		database.connect( (err, client, done) => {
            client.query('select count from  users where id = $1',
            [message.author.id], (err, result) => {
                done(err);
                if(result.rowCount == 0)
                {
                    message.reply('You haven\'t got any yet, nub');
                }
                else {
                    message.channel.send(`You currently have ${result.rows[0].count} <:omegalul:485431463299383296>.`);
                }

            });
    })
	}
	
	if (command === "award") {
		var targetuser = args[0].replace(/<@|!|>/g,"")
		var amount = args[1]
		 pool.connect( (err, client, done) => {
            client.query('update users set count = count + $2 where id = $1',
            [targetuser, amount], (err, result) => {

                done(err);
                //If user not in the database add them
                if (result.rowCount == 0){
                    client.query('insert into users (id, name, count) values ($1, $2, 1)',
                    [message.author.id, message.author.username], (err, result) => {
                        done(err);
                        console.log(result.rowCount);
                    });
                }
            });
	}
});


bot.on('message', (message) => {
    if(message.author.bot == false && (message.content.startsWith(prefix) == false) && (message.content.length < 10) ){
        database.connect( (err, client, done) => {
            client.query('update users set count = count + 1 where id = $1',
            [message.author.id], (err, result) => {
                done(err);
                if (result.rowCount == 0){
                    client.query('insert into users (id, name, count) values ($1, $2, 1)',
                    [message.author.id, message.author.username], (err, result) => {
                        done(err);
                        console.log(result.rowCount);
                    });
                }
            });
        });
    }
});



bot.on('guildMemberUpdate', (oldguy, newguy) => {
    database.connect( (err, client, done) => {
        client.query('update users set name = $1 where id = $2',
        [newguy.displayName, newguy.user.id], (err, result) => {
            done(err);
        });
    });
});


bot.login(token);