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
/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
require("reflect-metadata");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// eslint-disable-next-line import/first
var repositories_1 = require("../../src/repositories");
var service = new repositories_1.CountryRepository({
    tableName: 'countries',
    columns: ['country_name', 'country_abbr', 'country_code'],
    idColumn: 'country_id',
});
describe('Country Repository Suite', function () {
    it('should add a country', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.insert({
                        country_id: 901,
                        country_name: 'Zondani',
                        country_code: 'ZED',
                        country_abbr: 'ZED',
                    }, true)];
                case 1:
                    result = _a.sent();
                    expect(result).toBeTruthy();
                    expect(result).not.toBeInstanceOf(Array);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should delete a country', function () { return __awaiter(void 0, void 0, void 0, function () {
        var del;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.insert({
                        country_id: 902,
                        country_name: 'Zonda Uza Lema',
                        country_code: 'ZUL',
                        country_abbr: 'ZUL',
                    }, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.delete({
                            country_id: 902,
                            country_name: 'Zonda Uza Lema',
                        }, true)];
                case 2:
                    del = _a.sent();
                    expect(del).toBeTruthy();
                    expect(del).not.toBeInstanceOf(Array);
                    if (del) {
                        expect(del.country_id).toBe(902);
                        expect(del.country_name).toBe('Zonda Uza Lema');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('should update a country', function () { return __awaiter(void 0, void 0, void 0, function () {
        var update;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.insert({
                        country_id: 903,
                        country_name: 'Zonda Uza',
                        country_code: 'ZU',
                        country_abbr: 'ZU',
                    }, true)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, service.update(903, {
                            country_id: 903,
                            country_name: 'Zonda Uza Nafuti',
                        })];
                case 2:
                    update = _a.sent();
                    expect(update).toBeTruthy();
                    expect(update).not.toBeInstanceOf(Array);
                    if (update && !Array.isArray(update)) {
                        expect(update.country_id).toBe(903);
                        expect(update.country_name).toBe('Zonda Uza Nafuti');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, service.executeRawQuery('delete from countries where country_id > $1', [900])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
