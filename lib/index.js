"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var create_1 = __importDefault(require("./create"));
commander_1.default
    .command('create <project-name>')
    .description('create a new project by easy-cli')
    .option('-f, --force', 'Ovewrite target directory if exists')
    .action(function (name, cmd) {
    var options = cleanArgs(cmd);
    create_1.default(name, options);
});
commander_1.default.parse(process.argv);
function camelize(str) {
    return str.replace(/-(\w)/g, function (_, c) {
        return c ? c.toUpperCase() : '';
    });
}
function cleanArgs(cmd) {
    var args = {};
    cmd.options.forEach(function (o) {
        var key = camelize(o.long.replace(/^--/, ''));
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key];
        }
    });
    return args;
}
