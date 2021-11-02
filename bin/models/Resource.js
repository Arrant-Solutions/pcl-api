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
exports.Resource = exports.ResourceCreate = void 0;
// eslint-disable-next-line max-classes-per-file
var class_validator_1 = require("class-validator");
var IModel_1 = require("./IModel");
var ResourceCreate = /** @class */ (function () {
    function ResourceCreate() {
    }
    Object.defineProperty(ResourceCreate.prototype, "assign", {
        set: function (_a) {
            var resource_id = _a.resource_id, title = _a.title, description = _a.description, author_id = _a.author_id, resource_url = _a.resource_url, thumbnail_url = _a.thumbnail_url, user_id = _a.user_id, resource_availability_id = _a.resource_availability_id, resource_type_id = _a.resource_type_id, resource_category_id = _a.resource_category_id, media_type_id = _a.media_type_id;
            this.resource_id = resource_id;
            this.title = title;
            this.description = description;
            this.author_id = author_id;
            this.resource_url = resource_url;
            this.thumbnail_url = thumbnail_url;
            this.user_id = user_id;
            this.resource_availability_id = resource_availability_id;
            this.resource_type_id = resource_type_id;
            this.resource_category_id = resource_category_id;
            this.media_type_id = media_type_id;
        },
        enumerable: false,
        configurable: true
    });
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "resource_id", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(250)
    ], ResourceCreate.prototype, "title", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], ResourceCreate.prototype, "description", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "author_id", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], ResourceCreate.prototype, "resource_url", void 0);
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MaxLength)(255)
    ], ResourceCreate.prototype, "thumbnail_url", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "user_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "resource_category_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "resource_type_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "resource_availability_id", void 0);
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.IsPositive)()
    ], ResourceCreate.prototype, "media_type_id", void 0);
    return ResourceCreate;
}());
exports.ResourceCreate = ResourceCreate;
var Resource = /** @class */ (function (_super) {
    __extends(Resource, _super);
    function Resource(arg) {
        var _this = _super.call(this) || this;
        if (arg.resource_category_name && arg.resource_type_name) {
            _this.resource_id = arg.resource_id;
            _this.title = arg.title;
            _this.description = arg.description;
            _this.author = arg.author;
            _this.resource_url = arg.resource_url;
            _this.thumbnail_url = arg.thumbnail_url;
            _this.user = {
                user_id: arg.user_id,
                first_name: arg.first_name,
                last_name: arg.last_name,
                email: arg.email,
                phone: arg.phone,
                date_of_birth: arg.date_of_birth,
                user_group: {
                    user_group_id: arg.user_group_id,
                    user_group_name: arg.user_group_name,
                },
                country: {
                    country_id: arg.country_id,
                    country_name: arg.country_name,
                    country_abbr: arg.country_abbr,
                    country_code: arg.country_code,
                },
                gender: {
                    gender_id: arg.gender_id,
                    gender_name: arg.gender_name,
                },
                branch: {
                    branch_id: arg.branch_id,
                    branch_name: arg.branch_name,
                },
                user_status: {
                    user_status_id: arg.user_status_id,
                    user_status_name: arg.user_status_name,
                },
            };
            _this.resource_category = {
                resource_category_id: arg.resource_category_id,
                resource_category_name: arg.resource_category_name,
            };
            _this.resource_type = {
                resource_type_id: arg.resource_type_id,
                resource_type_name: arg.resource_type_name,
            };
            _this.resource_availability = {
                resource_availability_id: arg.resource_availability_id,
                resource_availability_name: arg.resource_availability_name,
            };
            _this.media_type = {
                media_type_id: arg.media_type_id,
                media_type_name: arg.media_type_name,
            };
            _this.author = {
                author_id: arg.author_id,
                title: arg.author_title,
                first_name: arg.author_first_name,
                last_name: arg.author_last_name,
                suffix: arg.author_suffix,
            };
        }
        return _this;
    }
    return Resource;
}(IModel_1.Model));
exports.Resource = Resource;
