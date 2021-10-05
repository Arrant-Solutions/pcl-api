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
// the R thing doesnt make sense
var BaseService = /** @class */ (function () {
    function BaseService(repository) {
        this.repository = repository;
    }
    BaseService.prototype.getTransactionClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.createTransactionClient()];
                    case 1:
                        client = _a.sent();
                        if (client) {
                            this.repository.setPool(client);
                        }
                        return [2 /*return*/, client];
                }
            });
        });
    };
    BaseService.prototype.setRepositoryClient = function (client) {
        this.repository.setPool(client);
    };
    BaseService.prototype.insert = function (model, withID) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('base service: ', model);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.repository.insert(model, withID)];
                    case 2:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to upload' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 3:
                        error_1 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.update = function (id, model) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.update(id, model)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to upload' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_2.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.insertMany = function (models, // Optional<T, 'created_at' | 'updated_at'>[],
    withID) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.insertMany(models, withID)];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to upload' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_3 = _a.sent();
                        console.error(error_3);
                        return [2 /*return*/, { statusCode: 500, data: error_3.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.findById(id)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to fetch with specified id' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_4 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_4.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.findAll = function (offset) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.findAll(offset)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to fetch content' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_5 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_5.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.findOne = function (filter, or, ignoreCase) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.findOne(filter, or, ignoreCase)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to fetch content' }];
                        }
                        if (result === null) {
                            return [2 /*return*/, { statusCode: 404, data: 'Resource not found' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_6.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.deleteById(id)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to delete' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_7 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_7.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.find = function (filter, or, ignoreCase) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.find(filter, or, ignoreCase)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to fetch items' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_8 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_8.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.findWildCard = function (filter, or) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.findWildCard(filter, or)];
                    case 1:
                        result = _a.sent();
                        if (typeof result === 'boolean') {
                            return [2 /*return*/, { statusCode: 500, data: 'Failed to delete' }];
                        }
                        return [2 /*return*/, { statusCode: 200, data: result }];
                    case 2:
                        error_9 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_9.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BaseService.prototype.executeRawQuery = function (query, params) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.repository.executeRawQuery(query, params)];
                    case 1:
                        result = _a.sent();
                        if (Array.isArray(result)) {
                            return [2 /*return*/, { statusCode: 200, data: result }];
                        }
                        throw new Error('Unexpected response');
                    case 2:
                        error_10 = _a.sent();
                        return [2 /*return*/, { statusCode: 500, data: error_10.message }];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BaseService;
}());
exports.default = BaseService;
