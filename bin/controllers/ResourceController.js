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
var roleBasedAuth_1 = require("../middleware/roleBasedAuth");
var ResourceController = /** @class */ (function () {
    function ResourceController() {
    }
    ResourceController.prototype.getAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.findAll()];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [4 /*yield*/, services_1.favoriteService.find({
                                user_id: request.tokenData.user_id,
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, response.status(statusCode).json({
                                statusCode: statusCode,
                                data: {
                                    media: data,
                                    favorites: Array.isArray(result.data) ? result.data : [],
                                },
                            })];
                }
            });
        });
    };
    ResourceController.prototype.getHomeResources = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.findAll()];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [4 /*yield*/, services_1.favoriteService.find({
                                user_id: request.tokenData.user_id,
                            })];
                    case 2:
                        result = _b.sent();
                        return [2 /*return*/, response.status(statusCode).json({
                                statusCode: statusCode,
                                data: {
                                    media: data,
                                    favorites: Array.isArray(result.data) ? result.data : [],
                                },
                            })];
                }
            });
        });
    };
    ResourceController.prototype.getOne = function (id, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.findById(id)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    ResourceController.prototype.post = function (resource, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.insert(resource)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    ResourceController.prototype.put = function (id, resource, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.update(id, resource)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    ResourceController.prototype.remove = function (id, request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, statusCode, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, services_1.resourceService.deleteById(id)];
                    case 1:
                        _a = _b.sent(), statusCode = _a.statusCode, data = _a.data;
                        return [2 /*return*/, response.status(statusCode).json({ statusCode: statusCode, data: data })];
                }
            });
        });
    };
    __decorate([
        (0, routing_controllers_1.Get)('/resources'),
        __param(0, (0, routing_controllers_1.Req)()),
        __param(1, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "getAll", null);
    __decorate([
        (0, routing_controllers_1.Get)('/resources/home'),
        __param(0, (0, routing_controllers_1.Req)()),
        __param(1, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "getHomeResources", null);
    __decorate([
        (0, routing_controllers_1.Get)('/resources/:id'),
        __param(0, (0, routing_controllers_1.Param)('id')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "getOne", null);
    __decorate([
        (0, routing_controllers_1.Post)('/resources'),
        __param(0, (0, routing_controllers_1.Body)()),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "post", null);
    __decorate([
        (0, routing_controllers_1.Put)('/resources/:id'),
        __param(0, (0, routing_controllers_1.Param)('id')),
        __param(1, (0, routing_controllers_1.Body)()),
        __param(2, (0, routing_controllers_1.Req)()),
        __param(3, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "put", null);
    __decorate([
        (0, routing_controllers_1.Delete)('/resources/:id'),
        __param(0, (0, routing_controllers_1.Param)('id')),
        __param(1, (0, routing_controllers_1.Req)()),
        __param(2, (0, routing_controllers_1.Res)())
    ], ResourceController.prototype, "remove", null);
    ResourceController = __decorate([
        (0, routing_controllers_1.JsonController)(),
        (0, routing_controllers_1.UseBefore)((0, roleBasedAuth_1.default)(['Customer', 'Content Manager', 'Management', 'Super User']))
    ], ResourceController);
    return ResourceController;
}());
exports.default = ResourceController;
