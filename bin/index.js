"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
require("reflect-metadata");
var routing_controllers_1 = require("routing-controllers");
var express = require("express");
var compression = require("compression");
var logger_1 = require("./config/logger");
var morgan_1 = require("./middleware/morgan");
var isAuth_1 = require("./middleware/isAuth");
var config_1 = require("./config");
var app = express();
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
app.use(isAuth_1.default);
(0, routing_controllers_1.useExpressServer)(app, {
    cors: true,
    routePrefix: "/api/" + config_1.API_VERSION,
    controllers: [__dirname + "/controllers/*.ts"],
});
app.use(function (req, res) {
    console.log('terminating not found the route');
    return res.status(404).json({
        statusCode: 404,
        data: 'Request not found',
        code: config_1.API_VERSION,
    });
});
app.listen(config_1.PORT, function () {
    console.debug('starting server.......');
    logger_1.default.debug("Server running on: http://localhost:" + config_1.PORT);
    console.debug("/api/" + config_1.API_VERSION);
    // eslint-disable-next-line no-underscore-dangle
    console.log('length ==> ', app._router.stack.length);
    // eslint-disable-next-line no-underscore-dangle
    app._router.stack // registered routes
        .filter(function (r) { return r.route; }) // take out all the middleware
        .map(function (r) {
        console.debug(r.route.path);
        return r.route.path;
    }); // get all the paths
});
