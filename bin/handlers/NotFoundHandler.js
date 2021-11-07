"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundHandler = void 0;
var routing_controllers_1 = require("routing-controllers");
var logger_1 = require("../config/logger");
var NotFoundHandler = /** @class */ (function () {
    // eslint-disable-next-line import/prefer-default-export
    function NotFoundHandler() {
    }
    // eslint-disable-next-line class-methods-use-this
    NotFoundHandler.prototype.error = function (error, request, response, next) {
        logger_1.default.debug('do something...', error);
        next();
    };
    NotFoundHandler = __decorate([
        (0, routing_controllers_1.Middleware)({ type: 'after' })
        // eslint-disable-next-line import/prefer-default-export
    ], NotFoundHandler);
    return NotFoundHandler;
}());
exports.NotFoundHandler = NotFoundHandler;
