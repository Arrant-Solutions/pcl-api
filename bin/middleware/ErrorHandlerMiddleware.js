"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var routing_controllers_1 = require("routing-controllers");
var error_1 = require("../config/error");
var ErrorHandlerMiddleware = /** @class */ (function () {
    function ErrorHandlerMiddleware() {
    }
    ErrorHandlerMiddleware.prototype.error = function (error, req, response, next) {
        if (error) {
            if (response.headersSent) {
                return response.end();
            }
            if (error.httpCode && error.message) {
                return response
                    .status(error.httpCode)
                    .json({ statusCode: error.httpCode, data: error.message });
            }
            return response.status(500).json({ statusCode: 500, data: error_1.INTERNAL_ERROR });
        }
        return next();
    };
    ErrorHandlerMiddleware = __decorate([
        (0, routing_controllers_1.Middleware)({ type: 'after' })
    ], ErrorHandlerMiddleware);
    return ErrorHandlerMiddleware;
}());
exports.default = ErrorHandlerMiddleware;
