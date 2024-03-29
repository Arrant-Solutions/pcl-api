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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
require("reflect-metadata");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var routing_controllers_1 = require("routing-controllers");
var express = require("express");
var compression = require("compression");
// import listEndpoints from 'express-list-endpoints'
var logger_1 = require("./config/logger");
var morgan_1 = require("./middleware/morgan");
// import isAuth from './middleware/isAuth'
var config_1 = require("./config");
var ErrorHandlerMiddleware_1 = require("./middleware/ErrorHandlerMiddleware");
var services_1 = require("./loaders/services");
// import {TokenValidationMiddleware} from './middleware/TokenValidationMiddleware'
// import {authService} from './loaders/services'
var app = (0, routing_controllers_1.createExpressServer)({
    authorizationChecker: function (action, roles) { return __awaiter(void 0, void 0, void 0, function () {
        var regexp, header, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    regexp = new RegExp("^(/health|/api/" + config_1.API_VERSION + "/(assets|auth/(register|refreshToken|fetchUser(.*)))(/)?(.*))");
                    if (regexp.test(action.request.url)) {
                        return [2 /*return*/, true];
                    }
                    header = action.request.headers.authorization;
                    return [4 /*yield*/, services_1.authService.findUserByToken(header)];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, false];
                    }
                    if (user && !roles.length) {
                        // eslint-disable-next-line no-param-reassign
                        action.request.user = user;
                        return [2 /*return*/, true];
                    }
                    if (user && roles.find(function (role) { return role === user.user_group.user_group_name; })) {
                        // eslint-disable-next-line no-param-reassign
                        action.request.user = user;
                        return [2 /*return*/, true];
                    }
                    return [2 /*return*/, false];
            }
        });
    }); },
    currentUserChecker: function (action) { return action.request.user; },
    cors: true,
    routePrefix: "/api/" + config_1.API_VERSION,
    defaultErrorHandler: false,
    controllers: [
        __dirname + "/controllers/*." + (config_1.ENV === 'production' ? 'js' : 'ts'),
    ],
    interceptors: [
    // `${__dirname}/interceptors/*.${ENV === 'production' ? 'js' : 'ts'}`,
    ],
    middlewares: [
        // `${__dirname}/handlers/*.${ENV === 'production' ? 'js' : 'ts'}`,
        // TokenValidationMiddleware,
        ErrorHandlerMiddleware_1.default,
    ],
});
app.use(morgan_1.default);
app.get('/logger', function (_, res) {
    logger_1.default.error('This is an error log');
    logger_1.default.warn('This is a warn log');
    logger_1.default.info('This is a info log');
    logger_1.default.http('This is a http log');
    logger_1.default.debug("/api/" + config_1.API_VERSION);
    res.send('Hello world');
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
// app.use(isAuth)
app.use('/health', function (req, res) {
    return res.send("<html>\n    <head><title>API Health</title></head>\n    <body>\n      <p style=\"color: green; font-size: 1.8rem; padding: 20px;\">\n      Healthy<br/>Version: " + process.env.UPDATE_CODE + "\n      </p>\n      </body>\n      </html>");
});
exports.default = app;
