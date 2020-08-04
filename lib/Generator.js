"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = __importDefault(require("fs-extra"));
var utils_1 = require("./utils/");
var Generator = /** @class */ (function () {
    function Generator() {
    }
    Generator.prototype.mkdirs = function (dir, options) {
        fs_extra_1.default.ensureDirSync(dir);
    };
    Generator.prototype.writeFiles = function (dir, files) {
        utils_1.writeFiles(dir, files);
    };
    Generator.prototype.copyFiles = function (src, dest) {
        utils_1.copyFiles(src, dest);
    };
    Generator.prototype.readJson = function (file) {
        return fs_extra_1.default.readJsonSync(file);
    };
    return Generator;
}());
exports.default = Generator;
