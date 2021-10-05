"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var class_transformer_1 = require("class-transformer");
var Branch_1 = require("./Branch");
var Country_1 = require("./Country");
var Gender_1 = require("./Gender");
var IModel_1 = require("./IModel");
var UserGroup_1 = require("./UserGroup");
var UserStatus_1 = require("./UserStatus");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(param) {
        var _this = _super.call(this) || this;
        if (User.isUserView(param)) {
            _this.avatar = param.avatar;
            _this.user_id = param.user_id;
            _this.first_name = param.first_name;
            _this.last_name = param.last_name;
            _this.email = param.email;
            _this.phone = param.phone;
            // this.password = param.password
            // this.password_salt = param.password_salt
            _this.user_group = {
                user_group_id: param.user_group_id,
                user_group_name: param.user_group_name,
            };
            _this.country = {
                country_id: param.country_id,
                country_name: param.country_name,
                country_abbr: param.country_abbr,
                country_code: param.country_code,
            };
            _this.gender = {
                gender_id: param.gender_id,
                gender_name: param.gender_name,
            };
            _this.branch = {
                branch_id: param.branch_id,
                branch_name: param.branch_name,
            };
            _this.user_status = {
                user_status_id: param.user_status_id,
                user_status_name: param.user_status_name,
            };
        }
        return _this;
    }
    User.isUserView = function (object) {
        return (typeof object === 'object' &&
            typeof object.first_name === 'string' &&
            typeof object.last_name === 'string' &&
            typeof object.email === 'string' &&
            typeof object.phone === 'string' &&
            typeof object.country_id === 'number' &&
            typeof object.country_abbr === 'string' &&
            typeof object.country_name === 'string' &&
            typeof object.gender_id === 'number' &&
            typeof object.gender_name === 'string' &&
            typeof object.user_group_id === 'number' &&
            typeof object.user_group_name === 'string');
    };
    __decorate([
        (0, class_transformer_1.Type)(function () { return UserGroup_1.UserGroup; })
    ], User.prototype, "user_group", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Country_1.Country; })
    ], User.prototype, "country", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Gender_1.Gender; })
    ], User.prototype, "gender", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return Branch_1.Branch; })
    ], User.prototype, "branch", void 0);
    __decorate([
        (0, class_transformer_1.Type)(function () { return UserStatus_1.UserStatus; })
    ], User.prototype, "user_status", void 0);
    return User;
}(IModel_1.Model));
exports.User = User;
