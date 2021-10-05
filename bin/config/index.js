"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailRegex = exports.Errors = exports.jwtExpiry = exports.jwtSecret = exports.database = void 0;
exports.database = {
    port: 9000,
    dbURL: process.env.pgConnectionString || '',
    name: process.env.database,
};
exports.jwtSecret = process.env.jwtSecret || '';
exports.jwtExpiry = process.env.jwtExpiry || '6h';
var Errors;
(function (Errors) {
    // eslint-disable-next-line no-unused-vars
    Errors["System"] = "Error occured. Unable to process request.";
})(Errors = exports.Errors || (exports.Errors = {}));
exports.emailRegex = process.env.emailRegex;
