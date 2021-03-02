### Config Guide
How to write a bot config
```json
{
    "token": "qwertyuiop",
    "prefix": "!",
    "command_dir": "./commands",
    "edited_commands": {
        "toggled": true false,
        "limit": int
    }
}
```
```
Token: Your bot's token
Prefix: Your bot's command prefix
Command_dir: The location of your commands folder
Edited_commands:
    Toggled: Whether or not your bot will run commands off of edited messages
    Limit: The time in sec between message creation and edit to be considered a legit command req
```
