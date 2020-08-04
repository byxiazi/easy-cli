"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exit = exports.error = void 0;
var util_1 = require("./util");
function error(err) {
    var message;
    if (typeof err === 'string') {
        message = err;
    }
    else if (util_1.isObject(err)) {
        message = err.message;
    }
    console.error(message);
}
exports.error = error;
function exit(code) {
    process.exit(code);
}
exports.exit = exit;
