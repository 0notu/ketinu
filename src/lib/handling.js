module.exports = (bot, msg) => {
    let args, cmd, file;
    try {
        args = msg.content.split(" ");
        cmd = args[0].split(bot.config.prefix)[1].toLowerCase();
        file = bot.commands[cmd];
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
        bot.commands[cmd].run(bot, msg, args); // call command function
    } catch (e) {
        if (e === "role") {
            console.log("Cmd failed | Improper Perms: "+e)
        } else {
            return /* yolo */
        }
        return
    }
}