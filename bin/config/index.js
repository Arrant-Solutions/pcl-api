"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.API_VERSION = exports.emailRegex = exports.Errors = exports.PRIVATE_KEY = exports.PUBLIC_KEY = exports.JWT_EXPIRY = exports.JWT_SECRET = exports.PORT = exports.database = void 0;
var fs_1 = require("fs");
exports.database = {
    port: 9000,
    dbURL: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME,
};
exports.PORT = process.env.PORT || 9000;
exports.JWT_SECRET = (_a = process.env, _a.JWT_SECRET), exports.JWT_EXPIRY = _a.JWT_EXPIRY;
exports.PUBLIC_KEY = process.env.NODE_ENV === 'development'
    ? (0, fs_1.readFileSync)(__dirname + "/../../keys/public-key.pem", 'utf8')
    : process.env.PUBLIC_KEY;
exports.PRIVATE_KEY = process.env.NODE_ENV === 'development'
    ? (0, fs_1.readFileSync)(__dirname + "/../../keys/private-key.pem", 'utf8')
    : process.env.PRIVATE_KEY;
// export const jwtSecret = process.env.passphrase
// export const jwtExpiry = process.env.jwtExpiry || '90d'
var Errors;
(function (Errors) {
    // eslint-disable-next-line no-unused-vars
    Errors["System"] = "Error occured. Unable to process request.";
})(Errors = exports.Errors || (exports.Errors = {}));
exports.emailRegex = /^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/gi;
exports.API_VERSION = process.env.API_VERSION || 'v1.0';
exports.ENV = process.env.ENV || 'production';
