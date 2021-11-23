"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var config_1 = require("./config");
var logger_1 = require("./config/logger");
app_1.default.listen(config_1.PORT, function () {
    logger_1.default.debug("API Version: /api/" + config_1.API_VERSION + "\n\n    " + __dirname + "/controllers/*." + (config_1.ENV === 'production' ? 'js' : 'ts'));
    // Logger.debug(listEndpoints(app))
    logger_1.default.debug(config_1.ENV);
    logger_1.default.debug("Server running on: http://localhost:" + config_1.PORT + "/api/" + config_1.API_VERSION);
});
