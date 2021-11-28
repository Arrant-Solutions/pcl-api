"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable class-methods-use-this */
require("reflect-metadata");
var AuthResponseInterceptor = /** @class */ (function () {
    function AuthResponseInterceptor() {
    }
    AuthResponseInterceptor.prototype.intercept = function (action, content) {
        console.log(content);
        return JSON.stringify({ statusCode: 401, data: 'Unauthorized' });
    };
    return AuthResponseInterceptor;
}());
exports.default = AuthResponseInterceptor;
