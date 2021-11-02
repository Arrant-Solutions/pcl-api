"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-escape */
// import * as argon2 from 'argon2'
var jwt = require("jsonwebtoken");
var config_1 = require("../config");
var AuthService = /** @class */ (function () {
    function AuthService(userService) {
        this.userService = userService;
    }
    AuthService.prototype.fetchUser = function (_a, andFilter) {
        var email = _a.email, user_id = _a.user_id;
        return __awaiter(this, void 0, void 0, function () {
            var _b, statusCode, data, token;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.userService.findOne(andFilter ? { email: email, user_id: user_id } : { email: email }, false, true)];
                    case 1:
                        _b = _c.sent(), statusCode = _b.statusCode, data = _b.data;
                        if (typeof data === 'string') {
                            return [2 /*return*/, {
                                    statusCode: statusCode,
                                    data: data,
                                }];
                        }
                        if (/^(Blocked|Disabled)$/i.test(data.user_status_name)) {
                            return [2 /*return*/, {
                                    statusCode: 401,
                                    data: "Your account was " + data.user_status_name + ". Please contact support.",
                                }];
                        }
                        token = this.generateJWT(data);
                        return [2 /*return*/, { statusCode: 200, data: { user: data, token: token } }];
                }
            });
        });
    };
    AuthService.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var statusCode, _a, status, result, token;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // console.log(JSON.stringify(user, null, 2))
                        if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.first_name)) {
                            return [2 /*return*/, { statusCode: 422, data: 'Please input a valid first name' }];
                        }
                        if (!/^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(user.last_name)) {
                            return [2 /*return*/, { statusCode: 422, data: 'Please input a valid last name' }];
                        }
                        if (!/^(1|2)$/.test(String(user.gender_id))) {
                            return [2 /*return*/, { statusCode: 422, data: 'Please select a valid gender' }];
                        }
                        if (!(user.country_id > 0 && user.country_id <= 250)) {
                            return [2 /*return*/, { statusCode: 422, data: 'Please select a valid country' }];
                        }
                        if (user.user_status_id &&
                            !(user.user_status_id > 0 && user.user_status_id <= 4)) {
                            return [2 /*return*/, { statusCode: 422, data: 'Please select a valid statuss' }];
                        }
                        return [4 /*yield*/, this.userService.findOne({
                                phone: user.phone,
                                email: user.email,
                            }, true)];
                    case 1:
                        statusCode = (_b.sent()).statusCode;
                        if (statusCode === 200) {
                            return [2 /*return*/, {
                                    statusCode: 409,
                                    data: "Duplicate email: " + user.email,
                                }];
                        }
                        return [4 /*yield*/, this.userService.insert(__assign(__assign({}, user), { user_group_id: 4, user_status_id: user.user_status_id || 3 }))];
                    case 2:
                        _a = _b.sent(), status = _a.statusCode, result = _a.data;
                        if (Array.isArray(result)) {
                            return [2 /*return*/, { statusCode: 422, data: result }];
                        }
                        if (typeof result === 'object') {
                            token = this.generateJWT(result);
                            return [2 /*return*/, {
                                    statusCode: status,
                                    data: {
                                        user: result,
                                        token: token,
                                    },
                                }];
                        }
                        return [2 /*return*/, { statusCode: status, data: result }];
                }
            });
        });
    };
    AuthService.prototype.refreshToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        decoded = this.decodeJWT(token);
                        if (typeof decoded === 'string') {
                            return [2 /*return*/, { statusCode: 401, data: decoded }];
                        }
                        return [4 /*yield*/, this.fetchUser(decoded, true)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    // eslint-disable-next-line class-methods-use-this
    AuthService.prototype.generateJWT = function (user) {
        var data = {
            user_id: user.user_id,
            phone: user.phone,
            email: user.email,
        };
        var expiration = config_1.JWT_EXPIRY;
        return jwt.sign({ data: data }, config_1.PRIVATE_KEY, {
            expiresIn: expiration,
            algorithm: 'RS256',
        });
    };
    // eslint-disable-next-line class-methods-use-this
    AuthService.prototype.decodeJWT = function (token) {
        try {
            var decoded = jwt.verify(token, config_1.PRIVATE_KEY, {
                algorithms: 'RS256',
            });
            return decoded.data;
        }
        catch (error) {
            return error.message;
        }
    };
    return AuthService;
}());
exports.default = AuthService;
