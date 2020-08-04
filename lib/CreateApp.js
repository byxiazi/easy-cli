"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var mustache_1 = __importDefault(require("mustache"));
var Generator_1 = __importDefault(require("./Generator"));
var utils_1 = require("./utils");
var CreateApp = /** @class */ (function () {
    function CreateApp(name, targetDir) {
        var _this = this;
        this.init = function (isTS) {
            var temp = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '..', 'templates/.gitignore.tpl'), 'utf-8');
            _this.generator.writeFiles(_this.targetDir, {
                '.gitignore': temp,
            });
            _this.generator.mkdirs(path_1.default.join(_this.targetDir, 'src'));
            if (isTS) {
                _this.addTSTemplate();
            }
            else {
                _this.addJSTemplate();
            }
        };
        this.addIndexTemplate = function (isTS) {
            var _a;
            var filename = isTS ? 'index.ts' : 'index.js';
            _this.generator.writeFiles(path_1.default.join(_this.targetDir, 'src'), (_a = {},
                _a[filename] = "console.log('hello, " + _this.name + "')",
                _a));
        };
        this.addJSTemplate = function () {
            _this.addIndexTemplate(false);
            _this.addPkgTemplate(false);
            _this.addWebpackTemplate();
            _this.copyTemplates(['.eslintignore', '.eslintrc.js'], path_1.default.resolve(__dirname, '..', 'templates'), _this.targetDir);
        };
        this.addWebpackTemplate = function () {
            var temp = fs_1.default.readFileSync(path_1.default.resolve(__dirname, '..', 'templates/webpack.config.tpl'), 'utf-8');
            temp = mustache_1.default.render(temp, {
                projectName: _this.name,
                libName: _this.name
                    .replace(/^[^a-zA-Z_$]*/, '')
                    .replace(/-(.)/g, function (_, $1) {
                    if (typeof $1 === 'string') {
                        return $1.toUpperCase();
                    }
                    return '';
                }),
            });
            _this.generator.writeFiles(_this.targetDir, {
                'webpack.config.js': temp,
            });
        };
        this.addTSTemplate = function () {
            _this.addIndexTemplate(true);
            _this.addPkgTemplate(true);
            _this.copyTemplates(['tsconfig.json', 'tslint.json'], path_1.default.resolve(__dirname, '..', 'templates'), _this.targetDir);
        };
        this.addPkgTemplate = function (isTS) {
            var pkg = require('../templates/package.json');
            var pkgConfig = require('../templates/package.config.json');
            var temp = pkgConfig.js;
            if (isTS) {
                temp = pkgConfig.ts;
            }
            utils_1.deepMerge(pkg, temp);
            _this.generator.writeFiles(_this.targetDir, {
                'package.json': JSON.stringify(pkg, null, 2),
            });
        };
        this.copyTemplates = function (files, srcDir, destDir, options) {
            var srcFiles = {};
            var destFiles = {};
            files.forEach(function (item) {
                srcFiles[item] = path_1.default.join(srcDir, item);
                destFiles[item] = path_1.default.join(destDir, (options && options[item]) || item);
            });
            _this.generator.copyFiles(srcFiles, destFiles);
        };
        this.name = name;
        this.targetDir = targetDir;
        this.generator = new Generator_1.default();
    }
    CreateApp.prototype.create = function (options) {
        var isTS = true;
        if (options.script === 'JavaScript') {
            isTS = false;
        }
        this.init(isTS);
    };
    return CreateApp;
}());
exports.default = CreateApp;
