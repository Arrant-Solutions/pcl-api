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
/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var services_1 = require("../loaders/services");
var branches_1 = require("./branches");
var countries_1 = require("./countries");
var genders_1 = require("./genders");
var media_types_1 = require("./media_types");
var resource_availability_1 = require("./resource_availability");
var resource_categories_1 = require("./resource_categories");
var resource_types_1 = require("./resource_types");
var users_1 = require("./users");
var user_groups_1 = require("./user_groups");
var user_statuses_1 = require("./user_statuses");
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Running in " + process.env.ENV + " mode");
                console.log('started seeding....', process.env.ENV);
                return [4 /*yield*/, services_1.branchService
                        .insertMany(branches_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('Branches inserted successfully');
                        else
                            console.log('Failed to insert branches');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 1:
                _a.sent();
                return [4 /*yield*/, services_1.countryService
                        .insertMany(countries_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('Countries inserted successfully');
                        else
                            console.log('Failed to insert Countries');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 2:
                _a.sent();
                return [4 /*yield*/, services_1.genderService
                        .insertMany(genders_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('Genders inserted successfully');
                        else
                            console.log('Failed to insert Genders');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 3:
                _a.sent();
                return [4 /*yield*/, services_1.mediaTypeService
                        .insertMany(media_types_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('MediaTypes inserted successfully');
                        else
                            console.log('Failed to insert MediaType');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 4:
                _a.sent();
                return [4 /*yield*/, services_1.resourceAvailabilityService
                        .insertMany(resource_availability_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('ResourceAvailability inserted successfully');
                        else
                            console.log('Failed to insert ResourceAvailability');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 5:
                _a.sent();
                return [4 /*yield*/, services_1.resourceCategoryService
                        .insertMany(resource_categories_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('ResourceCategories inserted successfully');
                        else
                            console.log('Failed to insert ResourceCategories');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 6:
                _a.sent();
                return [4 /*yield*/, services_1.resourceTypeService
                        .insertMany(resource_types_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('ResourceTypes inserted successfully');
                        else
                            console.log('Failed to insert ResourceTypes');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 7:
                _a.sent();
                return [4 /*yield*/, services_1.userGroupService
                        .insertMany(user_groups_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('UserGroups inserted successfully');
                        else
                            console.log('Failed to insert UserGroups');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 8:
                _a.sent();
                return [4 /*yield*/, services_1.userStatusService
                        .insertMany(user_statuses_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode;
                        if (statusCode === 200)
                            console.log('UserStatus inserted successfully');
                        else
                            console.log('Failed to insert UserStatus');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 9:
                _a.sent();
                return [4 /*yield*/, services_1.userService
                        .insertMany(users_1.default, true)
                        .then(function (_a) {
                        var statusCode = _a.statusCode, data = _a.data;
                        console.log(data);
                        if (statusCode === 200)
                            console.log('Users inserted successfully');
                        else
                            console.log('Failed to insert Users');
                    })
                        .catch(function (error) { return console.log(error); })];
            case 10:
                _a.sent();
                console.log('finished seeding....');
                return [2 /*return*/];
        }
    });
}); };
seed();
