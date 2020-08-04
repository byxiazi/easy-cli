"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = exports.isPlainObject = exports.isObject = void 0;
function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}
exports.isObject = isObject;
function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
}
exports.isPlainObject = isPlainObject;
function isArray(obj) {
    return Array.isArray(obj);
}
function deepMerge(to, from) {
    for (var key in from) {
        if (!isArray(to[key]) && isArray(from[key])) {
            to[key] = [];
        }
        else if (!isPlainObject(to[key]) && isPlainObject(from[key])) {
            to[key] = {};
        }
        isObject(from[key])
            ? deepMerge(to[key], from[key])
            : to[key] = from[key];
    }
}
exports.deepMerge = deepMerge;
