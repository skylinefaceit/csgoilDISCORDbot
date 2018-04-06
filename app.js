// TESTEST
// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});





client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
 
  
  
  if(command === "warn") {
    if(!message.member.roles.some(r=>["Admins", "CSGOIL"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");
    
    // Gets the username and puts it in warnUser.
    let warnUser = message.mentions.members.first();
    //Checks if you entered a valid username.
    if(!warnUser)
      return message.reply("Please mention a valid member of this server.");
    
    //Gets the reason and puts it in warnReason
    let warnReason = args.slice(1).join(' ');
    if(!warnReason)
      return message.reply("Please indicate a reason for the ");
    
    //Finally, message the user.
    await warnUser.send(`You have been warned by user ${message.author} because: ${warnReason}`)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't send a direct message to this user because of : ${error}`));
    console.log(`User ${warnUser} was warned by user ${message.author.tag} because: ${warnUser}`)
    message.channel.send(`${warnUser.user.tag} has been warned by ${message.author.tag} because: ${warnReason}`);
    

  
  }
  
  
  
  
 
  if(command === "dm") {
    if(!message.member.roles.some(r=>["Admins", "CSGOIL", "Moderators"].includes(r.name)) )
    return message.reply("Sorry you don't have premission to use that!")
   
    // Gets the username and puts it in warnUser.
    let dmUser = message.mentions.members.first();
    //Checks if you entered a valid username.
    if(!dmUser)
      return message.reply("Please mention a valid member of this server.");
    
    //Gets the reason and puts it in warnReason
    let dmReason = args.slice(1).join(' ');
    if(!dmReason)
      return message.reply("Please indicate a reason for the ");
    
    //Finally, message the user.
    await dmUser.send(`User, ${message.author} says: ${dmReason}`)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't send a direct message to that user because of : ${error}`));
    
    
      
  }
  


  
  
  
  

  
  
  //SOCIAL COMMANDS
  
  
  if(command === "socialtwitter") { 
  
    message.channel.send("Twitter - https://twitter.com/officialcsgoil")
    
  }
  
  if(command === "socialinsta") {
    message.channel.send("Instagram - https://www.instagram.com/csgoilfaceit/")
  }
  
  
  if(command === "info") {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: client.user.username,
      icon_url: client.user.avatarURL
    },
    title: "CSGOIL OFFICIAL DISCORD BOT",
    url: "https://google.com",
    description: "CSGOIL Bot uses an [open-sorcue code](https://github.com/skylinefaceit/csgoilDISCORDbot).",
    fields: [{
        name: "FACEIT",
        value: "Organzation [link](https://www.faceit.com/en/organizers/47f673aa-78d6-454b-8b72-34641263ed22/CSGOIL)."
      },
      {
        name: "Owner",
        value: "[FACEIT](https://www.faceit.com/en/players/SaarFACEIT), Discord @SkylineFACEIT#1825."
      },
      {
        name: "Moderators",
        value: "grouch: [FACEIT](https://www.faceit.com/en/players/grouch), Discord @talpa#0746"
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "|"
    }
  }
});
  }
 
  
  
  
  if(command === "say") {
    if(!message.member.roles.some(r=>["Admins", "Moderators", "CSGOIL"].includes(r.name)) )
    return message.reply("Sorry, you don't have permissions to use this!");   
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit: 
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Administrator", "Moderator", "CSGOIL"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    
    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as rver");
    if(!member.kickable) 
      return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
    
    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ");
    
    
    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }

  if(command === "faceit") {
    message.channel.send("Faceit page link - https://www.faceit.com/en/organizers/47f673aa-78d6-454b-8b72-34641263ed22/CSGOIL")
    
  }
  
  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
    if(!message.member.roles.some(r=>["Admins", "CSGOIL"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("Please indicate a reason for the ban!");
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});


client.login(process.env.B0T_T0KEN);
