"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = exports.API_VERSION = exports.emailRegex = exports.Errors = exports.jwtExpiry = exports.jwtSecret = exports.publicKey = exports.privateKey = exports.PORT = exports.database = void 0;
var fs_1 = require("fs");
exports.database = {
    port: 9000,
    dbURL: process.env.pgConnectionString ||
        'pgConnectionString=postgres://nctdoqvbfwdsfo:ce79098213f552d87731f23befe05e26867a519c1cad671b849f81f7723c996d@ec2-54-90-211-192.compute-1.amazonaws.com:5432/dd8hk4b1uh70sh',
    name: process.env.database || 'dd8hk4b1uh70sh',
};
exports.PORT = process.env.PORT || 9000;
exports.privateKey = (0, fs_1.readFileSync)(__dirname + "/../keys/private-key.pem", 'utf8');
exports.publicKey = (0, fs_1.readFileSync)(__dirname + "/../keys/public-key.pem", 'utf8');
exports.jwtSecret = process.env.passphrase ||
    'g4+[!(G]NNK_akGkEj/)8gPJy*g);fDfY=kh~`fq/NgQk`>9)3^MVBaEUQt~`y-';
exports.jwtExpiry = process.env.jwtExpiry || '90d';
var Errors;
(function (Errors) {
    // eslint-disable-next-line no-unused-vars
    Errors["System"] = "Error occured. Unable to process request.";
})(Errors = exports.Errors || (exports.Errors = {}));
exports.emailRegex = process.env.emailRegex ||
    '^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$';
exports.API_VERSION = process.env.API_VERSION || 'v1.0';
exports.ENV = process.env.ENV || 'production';
