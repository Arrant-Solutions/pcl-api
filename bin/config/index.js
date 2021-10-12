"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = exports.Errors = exports.jwtExpiry = exports.jwtSecret = exports.publicKey = exports.privateKey = exports.database = void 0;
var fs_1 = require("fs");
exports.database = {
    port: 9000,
    dbURL: process.env.pgConnectionString || '',
    name: process.env.database,
};
exports.privateKey = (0, fs_1.readFileSync)(__dirname + "/../../keys/private-key.pem", 'utf8');
exports.publicKey = (0, fs_1.readFileSync)(__dirname + "/../../keys/public-key.pem", 'utf8');
exports.jwtSecret = process.env.passphrase || '';
exports.jwtExpiry = process.env.jwtExpiry || '6h';
var Errors;
(function (Errors) {
    // eslint-disable-next-line no-unused-vars
    Errors["System"] = "Error occured. Unable to process request.";
})(Errors = exports.Errors || (exports.Errors = {}));
exports.emailRegex = process.env.emailRegex;
