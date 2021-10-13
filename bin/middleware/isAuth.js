"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("express-jwt");
var config_1 = require("../config");
var services_1 = require("../loaders/services");
var getTokenFromHeader = function (req) {
    if (req.headers.authorization &&
        req.headers.authorization.split(' ')[0] === 'Bearer') {
        var decoded = services_1.authService.decodeJWT(req.headers.authorization.split(' ')[1]);
        if (typeof decoded === 'object') {
            // eslint-disable-next-line no-param-reassign
            req.tokenData = decoded;
        }
        return req.headers.authorization.split(' ')[1];
    }
    return '';
};
var path = "^/api/" + config_1.API_VERSION + "/(assets|auth)(/)?(.*)";
exports.default = jwt({
    secret: config_1.privateKey,
    userProperty: 'token',
    getToken: getTokenFromHeader,
    credentialsRequired: false,
    algorithms: ['RS256'],
}).unless({ path: new RegExp(path) });
