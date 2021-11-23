"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
/* eslint-disable class-methods-use-this */
var routing_controllers_1 = require("routing-controllers");
var services_1 = require("../loaders/services");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    AuthController.prototype.refreshToken = function (token, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.authService.refreshToken(token)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    AuthController.prototype.fetchUser = function (email, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, services_1.authService.fetchUser({ email: email })];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, response.status(500).json({ statusCode: 500, data: error_1 })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthController.prototype.register = function (user, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.authService.register(user)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    AuthController.prototype.update = function (users, user, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        console.log(request.user);
                        return [4 /*yield*/, services_1.authService.update(16, // request.user.user_id,
                            user)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    __decorate([
        routing_controllers_1.Post('/auth/refreshToken'),
        __param(0, routing_controllers_1.HeaderParam('token')),
        __param(1, routing_controllers_1.Req()),
        __param(2, routing_controllers_1.Res())
    ], AuthController.prototype, "refreshToken", null);
    __decorate([
        routing_controllers_1.Get('/auth/fetchUser/:email'),
        __param(0, routing_controllers_1.Param('email')),
        __param(1, routing_controllers_1.Req()),
        __param(2, routing_controllers_1.Res())
    ], AuthController.prototype, "fetchUser", null);
    __decorate([
        routing_controllers_1.Post('/auth/register'),
        __param(0, routing_controllers_1.Body({ required: true })),
        __param(1, routing_controllers_1.Req()),
        __param(2, routing_controllers_1.Res())
    ], AuthController.prototype, "register", null);
    __decorate([
        routing_controllers_1.Put('/auth/:user_id'),
        __param(0, routing_controllers_1.CurrentUser({ required: true })),
        __param(1, routing_controllers_1.Body({ required: true })),
        __param(2, routing_controllers_1.Req()),
        __param(3, routing_controllers_1.Res())
    ], AuthController.prototype, "update", null);
    AuthController = __decorate([
        routing_controllers_1.JsonController()
    ], AuthController);
    return AuthController;
}());
exports.default = AuthController;
