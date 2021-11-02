"use strict";
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
var class_validator_1 = require("class-validator");
var database_1 = require("../loaders/database");
var BaseRepository = /** @class */ (function () {
    function BaseRepository(_a) {
        var tableName = _a.tableName, viewName = _a.viewName, columns = _a.columns, idColumn = _a.idColumn, hasA = _a.hasA, ignore = _a.ignore;
        this.pool = database_1.pool;
        this.idColumn = idColumn || tableName.replace(/(es|s)$/, '_id');
        this.columns = __spreadArray(__spreadArray([], columns, true), ['created_at', 'updated_at'], false);
        this.tableName = tableName;
        this.hasA = hasA || [];
        this.ignore = ignore || [];
        this.viewName = viewName;
    }
    BaseRepository.prototype.setPool = function (client) {
        this.pool = client;
    };
    BaseRepository.prototype.createTransactionClient = function () {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.connect()];
                    case 1:
                        client = _a.sent();
                        return [2 /*return*/, client];
                }
            });
        });
    };
    BaseRepository.prototype.insert = function (model, id, client) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, errs, _a, columns, placeholders, values, query, _b, rowCount, rows;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.model.assign = model;
                        return [4 /*yield*/, (0, class_validator_1.validate)(this.model)];
                    case 1:
                        errors = _c.sent();
                        if (errors.length > 0) {
                            errs = errors.reduce(function (result, error) { return __spreadArray(__spreadArray([], result, true), Object.values(error.constraints), true); }, []);
                            return [2 /*return*/, errs];
                        }
                        _a = this.generateInsertQueryParts(model, id), columns = _a.columns, placeholders = _a.placeholders, values = _a.values;
                        query = "INSERT INTO " + this.tableName + " (" + columns + ") VALUES (" + placeholders + ") RETURNING *";
                        return [4 /*yield*/, (client || this.pool).query(query, values)];
                    case 2:
                        _b = _c.sent(), rowCount = _b.rowCount, rows = _b.rows;
                        return [2 /*return*/, rowCount ? rows[0] : false];
                }
            });
        });
    };
    BaseRepository.prototype.update = function (id, model, user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var arg, item, errors, errs, _a, columns, values, query, _b, rowCount, rows;
            var _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        arg = (_c = {}, _c[this.idColumn] = id, _c.user_id = user_id, _c);
                        return [4 /*yield*/, (user_id
                                ? this.findOne(arg)
                                : this.findById(id))];
                    case 1:
                        item = _d.sent();
                        this.model.assign = __assign(__assign({}, item), model);
                        return [4 /*yield*/, (0, class_validator_1.validate)(this.model)];
                    case 2:
                        errors = _d.sent();
                        if (errors.length > 0) {
                            errs = errors.reduce(function (result, error) { return __spreadArray(__spreadArray([], result, true), Object.values(error.constraints), true); }, []);
                            return [2 /*return*/, errs];
                        }
                        if (!item) return [3 /*break*/, 4];
                        _a = this.generateUpdateQueryParts(model), columns = _a.columns, values = _a.values;
                        query = "UPDATE " + this.tableName + " SET (" + columns + ") WHERE " + this.idColumn + " = $" + (values.length + 1) + " RETURNING *";
                        return [4 /*yield*/, this.pool.query(query, __spreadArray(__spreadArray([], values, true), [id], false))];
                    case 3:
                        _b = _d.sent(), rowCount = _b.rowCount, rows = _b.rows;
                        if (rowCount)
                            return [2 /*return*/, rows[0]];
                        _d.label = 4;
                    case 4: return [2 /*return*/, false];
                }
            });
        });
    };
    BaseRepository.prototype.upsert = function (model, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var item, _a, errors, errs, update, insert;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!filter) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.findOne(filter)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.findById(model[this.idColumn])];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        item = _a;
                        this.model.assign = item ? __assign(__assign({}, item), model) : model;
                        return [4 /*yield*/, (0, class_validator_1.validate)(this.model)];
                    case 5:
                        errors = _b.sent();
                        if (errors.length > 0) {
                            errs = errors.reduce(function (result, error) { return __spreadArray(__spreadArray([], result, true), Object.values(error.constraints), true); }, []);
                            return [2 /*return*/, errs];
                        }
                        if (!item) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.update(model[this.idColumn], model)];
                    case 6:
                        update = _b.sent();
                        return [2 /*return*/, update];
                    case 7: return [4 /*yield*/, this.insert(model)];
                    case 8:
                        insert = _b.sent();
                        return [2 /*return*/, insert];
                }
            });
        });
    };
    // insertMany<Q = T>(models: Q[], withID?: boolean): Promise<boolean>
    BaseRepository.prototype.insertMany = function (models, withID) {
        var models_1, models_1_1;
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function () {
            var client, model, result, e_1_1, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, database_1.pool.connect()];
                    case 1:
                        client = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 17, 19, 20]);
                        client.query('BEGIN');
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 9, 10, 15]);
                        models_1 = __asyncValues(models);
                        _b.label = 4;
                    case 4: return [4 /*yield*/, models_1.next()];
                    case 5:
                        if (!(models_1_1 = _b.sent(), !models_1_1.done)) return [3 /*break*/, 8];
                        model = models_1_1.value;
                        return [4 /*yield*/, this.insert(model, withID, client)];
                    case 6:
                        result = _b.sent();
                        if (!result ||
                            (typeof result === 'object' && Array.isArray(result.errors)))
                            throw new Error("failed to insert: " + JSON.stringify(model));
                        _b.label = 7;
                    case 7: return [3 /*break*/, 4];
                    case 8: return [3 /*break*/, 15];
                    case 9:
                        e_1_1 = _b.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 15];
                    case 10:
                        _b.trys.push([10, , 13, 14]);
                        if (!(models_1_1 && !models_1_1.done && (_a = models_1.return))) return [3 /*break*/, 12];
                        return [4 /*yield*/, _a.call(models_1)];
                    case 11:
                        _b.sent();
                        _b.label = 12;
                    case 12: return [3 /*break*/, 14];
                    case 13:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 14: return [7 /*endfinally*/];
                    case 15: return [4 /*yield*/, client.query('COMMIT')];
                    case 16:
                        _b.sent();
                        return [2 /*return*/, true];
                    case 17:
                        e_2 = _b.sent();
                        // console.log(e)
                        return [4 /*yield*/, client.query('ROLLBACK')];
                    case 18:
                        // console.log(e)
                        _b.sent();
                        return [2 /*return*/, false];
                    case 19:
                        client.release();
                        return [7 /*endfinally*/];
                    case 20: return [2 /*return*/];
                }
            });
        });
    };
    BaseRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, _a, rowCount, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        columns = this.getColumns();
                        return [4 /*yield*/, this.pool.query("SELECT " + columns + " FROM " + this.tableName + " WHERE " + this.idColumn + " = $1", [id])];
                    case 1:
                        _a = _b.sent(), rowCount = _a.rowCount, rows = _a.rows;
                        if (rowCount)
                            return [2 /*return*/, rows[0]];
                        return [2 /*return*/, null];
                }
            });
        });
    };
    // eslint-disable-next-line class-methods-use-this
    BaseRepository.prototype.getLimitOffset = function (limit, offset) {
        if (limit && typeof offset === 'number') {
            return "LIMIT " + limit + " OFFSET " + offset;
        }
        if (limit) {
            return "LIMIT " + limit + " OFFSET 0";
        }
        if (offset) {
            return "LIMIT 100 OFFSET " + offset;
        }
        return '';
    };
    BaseRepository.prototype.findAll = function (limit, offset) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, limitOffset, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        columns = this.getColumns();
                        limitOffset = this.getLimitOffset(limit, offset);
                        return [4 /*yield*/, this.pool.query("SELECT " + columns + " FROM " + (this.viewName || this.tableName) + " ORDER BY " + this.idColumn + " " + limitOffset)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    BaseRepository.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rowCount, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.pool.query("DELETE FROM " + this.tableName + " WHERE $1 RETURNING *", [id])];
                    case 1:
                        _a = _b.sent(), rowCount = _a.rowCount, rows = _a.rows;
                        return [2 /*return*/, rowCount ? rows[0] : false];
                }
            });
        });
    };
    BaseRepository.prototype.delete = function (filter, or, ignoreCase) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, query, values, _b, rowCount, rows;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = BaseRepository.generateSearchQueryParts(filter, false, or, ignoreCase), query = _a.query, values = _a.values;
                        return [4 /*yield*/, this.pool.query("DELETE FROM " + this.tableName + " WHERE " + query + " RETURNING *", values)];
                    case 1:
                        _b = _c.sent(), rowCount = _b.rowCount, rows = _b.rows;
                        return [2 /*return*/, rowCount ? rows[0] : false];
                }
            });
        });
    };
    BaseRepository.prototype.find = function (filter, or, ignoreCase) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, _a, query, values, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        columns = this.getColumns();
                        _a = BaseRepository.generateSearchQueryParts(filter, false, or, ignoreCase), query = _a.query, values = _a.values;
                        return [4 /*yield*/, this.pool.query("SELECT " + columns + " FROM " + (this.viewName || this.tableName) + " WHERE " + query, values)];
                    case 1:
                        rows = (_b.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    BaseRepository.prototype.findOne = function (filter, or, ignoreCase) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.find(filter, or, ignoreCase)];
                    case 1:
                        rows = _a.sent();
                        return [2 /*return*/, rows.length ? rows[0] : null];
                }
            });
        });
    };
    BaseRepository.prototype.executeRawQuery = function (query, params) {
        return __awaiter(this, void 0, void 0, function () {
            var rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.pool.query(query, params)];
                    case 1:
                        rows = (_a.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    BaseRepository.prototype.findWildCard = function (filter, or) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, _a, query, values, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        columns = this.getColumns();
                        _a = BaseRepository.generateSearchQueryParts(filter, true, or), query = _a.query, values = _a.values;
                        return [4 /*yield*/, this.pool.query("SELECT " + columns + " FROM " + (this.viewName || this.tableName) + " WHERE " + query, values)];
                    case 1:
                        rows = (_b.sent()).rows;
                        return [2 /*return*/, rows];
                }
            });
        });
    };
    BaseRepository.prototype.generateInsertQueryParts = function (model, withID) {
        var _this = this;
        var cols = this.columns.filter(function (col) {
            return !(col === _this.idColumn ||
                /ated_at$/g.test(col) ||
                // eslint-disable-next-line no-bitwise
                ~_this.ignore.indexOf(col));
        }); // remove id column and date guys
        var columns = withID ? __spreadArray([this.idColumn], cols, true) : cols;
        return columns.reduce(function (acc, col, index) {
            // eslint-disable-next-line no-param-reassign
            acc.columns += index === columns.length - 1 ? "" + col : col + ", ";
            var param = index + 1;
            // eslint-disable-next-line no-param-reassign
            acc.placeholders +=
                index === columns.length - 1 ? "$" + param : "$" + param + ", ";
            // eslint-disable-next-line no-param-reassign
            acc.values.push(model[col]);
            return acc;
        }, { columns: '', placeholders: '', values: [] });
    };
    BaseRepository.prototype.generateUpdateQueryParts = function (model) {
        var _this = this;
        var cols = Object.keys(model).filter(function (col) {
            return !(col === _this.idColumn ||
                /ated_at$/g.test(col) ||
                // eslint-disable-next-line no-bitwise
                ~_this.ignore.indexOf(col));
        }); // remove id column and date guys
        return cols.reduce(function (acc, col, index) {
            var param = index + 1;
            // eslint-disable-next-line no-param-reassign
            acc.columns +=
                index === cols.length - 1
                    ? col + " = $" + param
                    : col + " = $" + param + ", ";
            acc.values.push(model[col]);
            return acc;
        }, { columns: '', values: [] });
    };
    BaseRepository.generateSearchQueryParts = function (model, wildcard, or, ignoreCase) {
        return Object.keys(model).reduce(function (acc, col, index, arr) {
            var param = index + 1;
            var operator = wildcard ? 'LIKE' : '=';
            var glue = or ? 'OR' : 'AND';
            var column = ignoreCase && typeof model[col] !== 'number' ? "LOWER(" + col + ")" : col;
            // console.log(model[col], col, typeof model[col])
            // eslint-disable-next-line no-param-reassign
            acc.query +=
                index === arr.length - 1
                    ? column + " " + operator + " $" + param
                    : column + " " + operator + " $" + param + " " + glue + " ";
            var value = wildcard ? "%" + model[col] + "%" : model[col];
            // eslint-disable-next-line no-param-reassign
            acc.values.push(ignoreCase ? String(value).toLowerCase() : value);
            return acc;
        }, { query: '', values: [] });
    };
    BaseRepository.prototype.getColumns = function () {
        var _this = this;
        var columns = __spreadArray([this.idColumn], this.columns, true).filter(function (col) { return !!_this.viewName || !~_this.ignore.indexOf(col); });
        return columns.reduce(function (acc, col, index) {
            // eslint-disable-next-line no-param-reassign
            acc +=
                index === columns.length - 1
                    ? (_this.viewName || _this.tableName) + "." + col
                    : (_this.viewName || _this.tableName) + "." + col + ", ";
            return acc;
        }, '');
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
