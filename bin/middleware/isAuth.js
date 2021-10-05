"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("express-jwt");
var config_1 = require("../config");
var getTokenFromHeader = function (req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return '';
};
exports.default = jwt({
    secret: config_1.jwtSecret,
    userProperty: 'token',
    getToken: getTokenFromHeader,
    algorithms: ['RS256'],
}).unless({ path: ['/assets'] });
