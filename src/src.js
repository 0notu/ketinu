const Discord = require('discord.js');

module.exports = class Bot {
    constructor(config) {
        this.client = new Discord.Client()
        this.client.config = config
        // file config
        this.client.commands = require('./lib/commands.js')(this.client.config.command_dir)
        this.client.background = require('./lib/background.js')
        // setting up data handler
        this.client.data = require('./lib/data.js')
    }
    run () {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
          
        this.client.on('message', msg => {

            try {
                this.client.background(this.client);
            } catch (e) {
                console.log("Background Process Failed: "+e)
            }

            let args, cmd, file;
            try {
                args = msg.content.split(" ");
                cmd = args[0].split(this.client.config.prefix)[1].toLowerCase();
                file = this.client.commands[cmd];
                args.shift() // removing command from arg array
            } catch(e) { // not actually a command
                return
            }
            try {
                // checking perms
                let user_roles = [];
                msg.member.roles.cache.forEach((role, id) => {
                    user_roles.push(id)
                })
                let accepted = file.help.roles || new Array(msg.guild.roles.everyone.id);
                let exists = user_roles.some(r=>accepted.includes(r))
                if (!exists) {throw "role"}

                
                // everything ok, run command
                console.log("Command Called: "+cmd)
                this.client.commands[cmd].run(this.client, msg, args); // call command function
            } catch (e) {
                if (e === "role") {
                    console.log("Cmd failed: "+e)
                    //msg.react("768291025315168266")
                } else {
                    return /* yolo */
                }
                return
            }
        });
          
        this.client.login(this.client.config.token);
    }

}

