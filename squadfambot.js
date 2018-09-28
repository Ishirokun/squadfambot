const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs")
let points = JSON.parse(fs.readFileSync("./points.json", "utf8"));
let general = JSON.parse(fs.readFileSync("./general.json", "utf8"));
const prefix = "!";
var http = require('http');


client.on("ready", () => {
  console.log("The bot has started.");
  client.user.setPresence({
        game: {
            name: 'with ONII-CHAAAAAAN',
        }
    });
});

client.on("message", (message) => {
  if(message.author.bot) return;
  if (message.content.startsWith('- *** Would you rather? *** -')&&message.author.id == 258247247987212288){
      message.react("⬅")
      setTimeout(function(){
message.react("➡")
      }, 1000) 
    return;
  }  
});  

client.on("message", (message) => {
  if(message.author.bot) return;
  let name = client.users.get(message.author.id).username;
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
     client.channels.get("368435981256491019").send(text)
   }

if (command === "pay") {
		let pay = args[1];
		if (pay = null||pay.includes("-")) {return;}
  
//  let x = client.users.get('name', `${pay}`).id
		message.delete()
if (isNumeric(args[1])&&args[2] == null&&args[0].includes("<@")) {
	  {
	let x = args[0].replace(/<@|>|!/g,"")
  if (x == message.author.id) {
  message.reply(`You cannot pay yourself`)
    return;
  }
      
	if (x == null) return;
      if (isNumeric(x)) {
	{
	let userData = points[message.author.id];
	let newpoint = Math.floor(+userData.points-args[1])
	if (newpoint < 0) {
		message.reply(`You don't have enough <:omegalul:485431463299383296>s`);
		return;
	}
	userData.points = newpoint,
	userData.level = 0};
	  
	let userData = points[x];
	let newpoint = Math.floor(+userData.points-(-args[1]))
	userData.points = newpoint
	userData.level = 0
      }
	};
	
	let y = args[0]
	let z = args[1]
	message.channel.send(`${message.author.username} paid ${y} ${z} <:omegalul:485431463299383296>`); 
			}
      else
      message.channel.send(`That user does not exist`)
	};
  
  
  
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
     message.channel.send(client.users.get(x).avatarURL)
    return;
  };
  
  if (command === "award") {
    if (!message.member.roles.find("name", "Special Permission")) {
       message.channel.send("You don't have permission to use that command.")
       return;
  }
    message.delete();  
    if (isNumeric(args[1])&&args[2] == null&&args[0].includes("<@")) {
	let x = args[0].replace(/<@|>|!/g,"") 
	if (x == null) return;
      if (isNumeric(x)) {
	let userData = points[x];
	let newpoint = Math.floor(userData.points-(-args[1]))
	userData.points = newpoint
	userData.level = 0
      }
	let y = args[0]
	let z = args[1]
	message.channel.send(`Awarded ${y} ${z} <:omegalul:485431463299383296>s`); 
  }
};

  if (command === "deduct") {
    if (!message.member.roles.find("name", "Special Permission")) {
       message.channel.send("You don't have permission to use that command.")
       return;
  }
    message.delete();  
    if (isNumeric(args[1])&&args[2] == null&&args[0].includes("<@")) {
	let x = args[0].replace(/<@|>|!/g,"") 
	if (x == null) return;
      if (isNumeric(x)) {
	let userData = points[x];
	let newpoint = Math.floor(userData.points-(args[1]))
	userData.points = newpoint
	userData.level = 0
      }
	let y = args[0]
	let z = args[1]
	message.channel.send(`${y} got confiscated of ${z} <:omegalul:485431463299383296>s`); 
  }
};
  
	if (command === "omegalul"||command === "o") {
    message.delete();
    if (args[0] == null) {
      let userData = points[message.author.id]
      let curLevel = Math.floor((1)+(0.2 * Math.sqrt(userData.points)));
      userData.level = curLevel;
      message.reply(`You are currently a level ${userData.level} memer, with ${userData.points} <:omegalul:485431463299383296>.`);
      return;
    }
    if (args[0] !== null&&args[0].includes('<@')) {
  let x = args[0].replace(/<@|>|!/g,"")
//  let guildselected = client.guild.get('368435980484476932')
  let y = message.guild.roles.get('371459491583098891').members.map(m=>m.id);
  if (y.includes(x)) return;
	if (x == null||x == message.author.id) {return;}
      if (isNumeric(x)) {
     let userData = points[x]
     let curLevel = Math.floor((1)+(0.2 * Math.sqrt(userData.points)));
      userData.level = curLevel;
     if (userData == null) return;
     message.channel.send(`${args[0]} are currently a level ${userData.level} memer, with ${userData.points} <:omegalul:485431463299383296>.`);
      }
    }
  };
  
  
  
  if (command === "delay") {
    if (!isNumeric(args[0])||args[0] < 3 || args[0] > 60) {
      message.channel.send(`Please input a number between 3 ~ 60`)
        return;
    }
      if (!general[message.author.id]) general[message.author.id] = {
    delay: 60
  };
    
      message.channel.send(`Have set your delay to ${args[0]} seconds.`)
      let userProfile = general[message.author.id]
      userProfile.delay = args[0]
  }
  
  
  if (command === "top"){
    var top = [];
    const member = message.guild.roles.get("486555663502147605"); 
    member.members.forEach(member => { 
      let userData = points[member.id]
      var obj = {};
      obj["user"] = member.user.username;
      obj["points"] = userData.points;
      top.push(obj);
    }); 
    top.sort(function (a, b) {
      return b.points - a.points;
     });
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: message.guild.name,
      icon_url: message.guild.iconURL
    },
    title: "HALL OF FAME",
    url: "",
    description: "Top 5 members who farms a lot of OMEGALULS",
    fields: [{
        name: "Top 1",
        value: `${top[0].user} with ${top[0].points} <:omegalul:485431463299383296>.`
      },
      {
        name: "Top 2",
        value: `${top[1].user} with ${top[1].points} <:omegalul:485431463299383296>.`
      },
      {
        name: "Top 3",
        value: `${top[2].user} with ${top[2].points} <:omegalul:485431463299383296>.`
      },
             {
        name: "Top 4",
        value: `${top[3].user} with ${top[3].points} <:omegalul:485431463299383296>.`
      },
             {
        name: "Top 5",
        value: `${top[4].user} with ${top[4].points} <:omegalul:485431463299383296>.`
      },
    ],
    }
  }
);
}

  if (command === "help"){
    
  
  
  
  
  
  
  
  };
  

  
  
  if (command === "test"){
    let a = general[message.author.id]
    console.log(`${a.delay}`)
		}

          
          
          
          
          
});  




function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}

client.on("guildMemberAdd", (member) => {
  if(member.bot) return;
  if (!points[member.id]) points[member.id] = {
    points: 0,
    level: 0
  };
});

client.on("message", (message) => {
  if(message.author.bot) return;
      if (message.channel.id.startsWith("368435981256491019")) {
        if (message.attachments.size > 0) {
          let userProfile = general[message.author.id]
          if (!general[message.author.id]) {
            var timeout = 60000
            console.log(`no info`)
            }
          else 
          {
          let userProfile = general[message.author.id]
          var timeout = Math.floor(1000 * userProfile.delay)
          }
          var Attachment = (message.attachments).array();
          console.log(Attachment[0].url); 


          
          setTimeout(function () {
              message.delete();
            }, timeout)
        }   
      }
  
  if (message.content.length < 10) {return;}
  if (message.content.startsWith(prefix)) {return;}
  if (!points[message.author.id]) points[message.author.id] = {
    points: 0,
    level: 0
  };
  let userData = points[message.author.id];
  userData.points++;
  
  

  let curLevel = Math.floor((1)+(0.2 * Math.sqrt(userData.points)));
  if (curLevel > userData.level) {
    userData.level = curLevel;
  }
  
  
  fs.writeFile("./points.json", JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

    
  fs.writeFile("./general.json", JSON.stringify(general), (err) => {
    if (err) console.error(err)
  });    
               }
  
         );

client.login(process.env.token);