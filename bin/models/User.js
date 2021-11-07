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
exports.User = exports.UserCreate = void 0;
// eslint-disable-next-line max-classes-per-file
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var Branch_1 = require("./Branch");
var Country_1 = require("./Country");
var Gender_1 = require("./Gender");
var IModel_1 = require("./IModel");
var UserGroup_1 = require("./UserGroup");
var UserStatus_1 = require("./UserStatus");
var AgeValidator_1 = require("../validators/AgeValidator");
var UserCreate = /** @class */ (function () {
    function UserCreate() {
    }
    Object.defineProperty(UserCreate.prototype, "assign", {
        set: function (_a) {
            var user_id = _a.user_id, avatar = _a.avatar, first_name = _a.first_name, last_name = _a.last_name, email = _a.email, phone = _a.phone, date_of_birth = _a.date_of_birth, user_group_id = _a.user_group_id, country_id = _a.country_id, gender_id = _a.gender_id, branch_id = _a.branch_id, user_status_id = _a.user_status_id;
            this.user_id = user_id;
            this.avatar = avatar;
            this.first_name = first_name;
            this.last_name = last_name;
            this.email = email;
            this.phone = phone;
            this.date_of_birth = date_of_birth;
            this.user_group_id = user_group_id;
            this.country_id = country_id;
            this.gender_id = gender_id;
            this.branch_id = branch_id;
            this.user_status_id = user_status_id;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "user_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], UserCreate.prototype, "avatar", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(50)
    ], UserCreate.prototype, "first_name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(50)
    ], UserCreate.prototype, "last_name", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(190),
        (0, class_validator_1.IsEmail)()
    ], UserCreate.prototype, "email", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], UserCreate.prototype, "phone", void 0);
    __decorate([
        (0, class_validator_1.Validate)(AgeValidator_1.default),
        (0, class_validator_1.MaxLength)(255)
    ], UserCreate.prototype, "date_of_birth", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "user_group_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "country_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "gender_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "user_status_id", void 0);
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], UserCreate.prototype, "branch_id", void 0);
    return UserCreate;
}());
exports.UserCreate = UserCreate;
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
