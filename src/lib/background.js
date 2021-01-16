module.exports = (bot) => { // runs background tasks
    for (var c in bot.commands) {
        let f = bot.commands[c]

        if (f.background) {
            f.background(bot)
        }   
    }    
}
