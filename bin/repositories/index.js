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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatusRepository = exports.UserRepository = exports.ResourceRepository = exports.ResourceCategoryRepository = exports.ResourceTypeRepository = exports.ResourceAvailabilityRepository = exports.MediaTypeRepository = exports.UserGroupRepository = exports.GenderRepository = exports.CountryRepository = exports.BranchRepository = void 0;
var BaseRepository_1 = require("./BaseRepository");
var BranchRepository = /** @class */ (function (_super) {
    __extends(BranchRepository, _super);
    function BranchRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BranchRepository;
}(BaseRepository_1.BaseRepository));
exports.BranchRepository = BranchRepository;
var CountryRepository = /** @class */ (function (_super) {
    __extends(CountryRepository, _super);
    function CountryRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CountryRepository;
}(BaseRepository_1.BaseRepository));
exports.CountryRepository = CountryRepository;
var GenderRepository = /** @class */ (function (_super) {
    __extends(GenderRepository, _super);
    function GenderRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GenderRepository;
}(BaseRepository_1.BaseRepository));
exports.GenderRepository = GenderRepository;
var UserGroupRepository = /** @class */ (function (_super) {
    __extends(UserGroupRepository, _super);
    function UserGroupRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserGroupRepository;
}(BaseRepository_1.BaseRepository));
exports.UserGroupRepository = UserGroupRepository;
var MediaTypeRepository = /** @class */ (function (_super) {
    __extends(MediaTypeRepository, _super);
    function MediaTypeRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MediaTypeRepository;
}(BaseRepository_1.BaseRepository));
exports.MediaTypeRepository = MediaTypeRepository;
var ResourceAvailabilityRepository = /** @class */ (function (_super) {
    __extends(ResourceAvailabilityRepository, _super);
    function ResourceAvailabilityRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceAvailabilityRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceAvailabilityRepository = ResourceAvailabilityRepository;
var ResourceTypeRepository = /** @class */ (function (_super) {
    __extends(ResourceTypeRepository, _super);
    function ResourceTypeRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceTypeRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceTypeRepository = ResourceTypeRepository;
var ResourceCategoryRepository = /** @class */ (function (_super) {
    __extends(ResourceCategoryRepository, _super);
    function ResourceCategoryRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceCategoryRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceCategoryRepository = ResourceCategoryRepository;
var ResourceRepository = /** @class */ (function (_super) {
    __extends(ResourceRepository, _super);
    function ResourceRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResourceRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceRepository = ResourceRepository;
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserRepository;
}(BaseRepository_1.BaseRepository));
exports.UserRepository = UserRepository;
var UserStatusRepository = /** @class */ (function (_super) {
    __extends(UserStatusRepository, _super);
    function UserStatusRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return UserStatusRepository;
}(BaseRepository_1.BaseRepository));
exports.UserStatusRepository = UserStatusRepository;
