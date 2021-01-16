const fs = require('fs');
const path = require('path');
const data = require('./data');
let commands = {}

function get_command_dir_path(cmd_dir) {
    var absolute = path.resolve(cmd_dir)
    return absolute
}

function run_me(command_dir) {
    try {
        clean(get_command_dir_path(command_dir))
    } catch {/*Yolo*/}
    finally {
        for (alias in commands) {
            p = commands[alias]
            commands[alias] = require(p)
            try { /*Setting Data File*/
                let data_path = p+"/../data.json";
                commands[alias].data_content = require(data_path);
                commands[alias].data_path = data_path;
            } catch (e) {/*No Data File Exists*/}
        }
        console.log(commands)
        return commands
        
    }
}

function search (path, files) {
    try {
        fs.readdirSync(path).forEach(function(file){
            var subpath = path + '/' + file;
            if(fs.lstatSync(subpath).isDirectory()){
                search(subpath, files);
            } else if (file.split(".")[1] == "js") {
                files.push(path + '/' + file);
            }
        })
    } catch (e) {console.log(e)}
}

function clean (dir) {
    var file_array = [];
    search(dir, file_array);
    for (var file of file_array) {
        let alias = file.split("/").pop().split(".")[0]
        let relative = path.relative(__dirname, file)
        commands[alias] = relative
    }
}
module.exports = (command_dir) => {return run_me(command_dir)}