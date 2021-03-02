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
        // command handling
        this.client.handling = require('./lib/handling.js')
    }
    run () {
        this.client.on('ready', () => {
            console.log(`Logged in as ${this.client.user.tag}!`);
        });
        
        // normal message handling
        this.client.on('message', msg => {
            try {
                this.client.background(this.client);
            } catch (e) {
                console.log("Background Process Failed: "+e)
            }
            this.client.handling(this.client, msg)
        });

        // edited message handling (Toggleable by bot owner)
        if (this.client.config.edited_commands.toggled) {
            let limit = this.client.config.edited_commands.limit;
            this.client.on('messageUpdate', (old_msg, new_msg) => {
                // the newer timestamp is going to be larger, but the diff is absolute anyway
                let time_difference = (new_msg.editedTimestamp - old_msg.createdTimestamp)/1000;
                if (limit < time_difference) {return}
                else {
                    this.client.handling(this.client, new_msg)
                }
            })
        }
          
        this.client.login(this.client.config.token);
    }

}

