const fs = require('fs')
module.exports = function data (bot, name, callback) {
        let db = bot.commands[name].data_content;
        try {
            bot.commands[name].data_content = JSON.stringify(callback(db))
            fs.writeFile(bot.commands[name].data_path, 
                bot.commands[name].data_content,
                (err) => {if (err) {console.log("Error: "+err)}}
                )
        } catch (e) { // already an object
            console.log("Error: "+e)
        }
    }