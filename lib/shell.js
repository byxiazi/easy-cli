"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitInit = void 0;
var shelljs_1 = __importDefault(require("shelljs"));
function gitInit(targetDir) {
    shelljs_1.default.cd(targetDir);
    if (shelljs_1.default.exec('git init').code !== 0) {
        shelljs_1.default.echo('Error: Git init failed');
        shelljs_1.default.exit(1);
    }
}
exports.gitInit = gitInit;
