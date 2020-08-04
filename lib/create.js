"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
var CreateApp_1 = __importDefault(require("./CreateApp"));
var utils_1 = require("./utils");
function create(projectName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var cwd, inCurrent, name, targetDir, result, ok, action, scriptPrompt, creator;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!projectName) {
                        utils_1.error(chalk_1.default.red('Error: The project name must be entered'));
                        utils_1.exit(1);
                    }
                    cwd = process.cwd();
                    inCurrent = projectName === '.';
                    name = inCurrent ? path_1.default.relative('../', cwd) : projectName;
                    targetDir = path_1.default.resolve(cwd, projectName);
                    result = validate_npm_package_name_1.default(name);
                    if (!result.validForNewPackages) {
                        utils_1.error(chalk_1.default.red("Invalid project name: \"" + name + "\""));
                        result.errors &&
                            result.errors.forEach(function (err) {
                                utils_1.error(chalk_1.default.red.dim('Error: ' + err));
                            });
                        result.warnings &&
                            result.warnings.forEach(function (warn) {
                                utils_1.error(chalk_1.default.red.dim('Warning: ' + warn));
                            });
                        utils_1.exit(1);
                    }
                    if (!fs_extra_1.default.existsSync(targetDir)) return [3 /*break*/, 8];
                    if (!options.force) return [3 /*break*/, 2];
                    return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 8];
                case 2:
                    utils_1.clearConsole();
                    if (!inCurrent) return [3 /*break*/, 4];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'ok',
                                type: 'confirm',
                                message: "Generate project in current directory?",
                            },
                        ])];
                case 3:
                    ok = (_a.sent()).ok;
                    if (!ok) {
                        return [2 /*return*/];
                    }
                    return [3 /*break*/, 8];
                case 4: return [4 /*yield*/, inquirer_1.default.prompt([
                        {
                            name: 'action',
                            type: 'list',
                            message: "Target directory " + chalk_1.default.cyan(targetDir) + " already exists. Pick an action:",
                            choices: [
                                { name: 'Overwrite', value: 'overwrite' },
                                { name: 'Cancel', value: false },
                            ],
                        },
                    ])];
                case 5:
                    action = (_a.sent()).action;
                    if (!!action) return [3 /*break*/, 6];
                    return [2 /*return*/];
                case 6:
                    if (!(action === 'overwrite')) return [3 /*break*/, 8];
                    console.log("\nRemoving " + chalk_1.default.cyan(targetDir) + "...");
                    return [4 /*yield*/, fs_extra_1.default.remove(targetDir)];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8: return [4 /*yield*/, inquirer_1.default.prompt({
                        type: 'list',
                        name: 'script',
                        message: 'Select script language: ',
                        choices: [
                            {
                                name: 'JavaScript',
                                value: 'JavaScript',
                            },
                            {
                                name: 'TypeScript',
                                value: 'TypeScript',
                            },
                        ],
                    })];
                case 9:
                    scriptPrompt = _a.sent();
                    utils_1.mergeOptions(options, scriptPrompt);
                    copyCommonTemps([
                        '.editorconfig',
                        '.gitignore',
                        '.prettierignore',
                        '.prettierrc',
                        'README.md',
                    ], path_1.default.resolve(__dirname, '..', 'templates'), targetDir);
                    creator = new CreateApp_1.default(name, targetDir);
                    creator.create(options);
                    return [2 /*return*/];
            }
        });
    });
}
function copyCommonTemps(files, srcDir, destDir) {
    var srcFiles = {};
    var destFiles = {};
    files.forEach(function (item) {
        srcFiles[item] = path_1.default.join(srcDir, item);
        destFiles[item] = path_1.default.join(destDir, item);
    });
    utils_1.copyFiles(srcFiles, destFiles);
}
exports.default = (function (projectName, options) {
    return create(projectName, options).catch(function (err) {
        utils_1.error(err);
    });
});
