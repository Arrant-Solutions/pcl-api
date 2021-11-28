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
exports.UserStatusRepository = exports.FeedbackRepository = exports.UserRepository = exports.FavoriteRepository = exports.ResourceRepository = exports.ResourceCategoryRepository = exports.ResourceTypeRepository = exports.ResourceAvailabilityRepository = exports.MediaTypeRepository = exports.UserGroupRepository = exports.GenderRepository = exports.CountryRepository = exports.BranchRepository = void 0;
/* eslint-disable max-classes-per-file */
var Branch_1 = require("../models/Branch");
var Country_1 = require("../models/Country");
var Gender_1 = require("../models/Gender");
var MediaType_1 = require("../models/MediaType");
var ResourceAvailability_1 = require("../models/ResourceAvailability");
var ResourceCategory_1 = require("../models/ResourceCategory");
var ResourceType_1 = require("../models/ResourceType");
var User_1 = require("../models/User");
var UserGroup_1 = require("../models/UserGroup");
var BaseRepository_1 = require("./BaseRepository");
var UserStatus_1 = require("../models/UserStatus");
var Resource_1 = require("../models/Resource");
var Favorite_1 = require("../models/Favorite");
var Feedback_1 = require("../models/Feedback");
var BranchRepository = /** @class */ (function (_super) {
    __extends(BranchRepository, _super);
    function BranchRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Branch_1.Branch();
        return _this;
    }
    return BranchRepository;
}(BaseRepository_1.BaseRepository));
exports.BranchRepository = BranchRepository;
var CountryRepository = /** @class */ (function (_super) {
    __extends(CountryRepository, _super);
    function CountryRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Country_1.Country();
        return _this;
    }
    return CountryRepository;
}(BaseRepository_1.BaseRepository));
exports.CountryRepository = CountryRepository;
var GenderRepository = /** @class */ (function (_super) {
    __extends(GenderRepository, _super);
    function GenderRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Gender_1.Gender();
        return _this;
    }
    return GenderRepository;
}(BaseRepository_1.BaseRepository));
exports.GenderRepository = GenderRepository;
var UserGroupRepository = /** @class */ (function (_super) {
    __extends(UserGroupRepository, _super);
    function UserGroupRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new UserGroup_1.UserGroup();
        return _this;
    }
    return UserGroupRepository;
}(BaseRepository_1.BaseRepository));
exports.UserGroupRepository = UserGroupRepository;
var MediaTypeRepository = /** @class */ (function (_super) {
    __extends(MediaTypeRepository, _super);
    function MediaTypeRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new MediaType_1.MediaType();
        return _this;
    }
    return MediaTypeRepository;
}(BaseRepository_1.BaseRepository));
exports.MediaTypeRepository = MediaTypeRepository;
var ResourceAvailabilityRepository = /** @class */ (function (_super) {
    __extends(ResourceAvailabilityRepository, _super);
    function ResourceAvailabilityRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new ResourceAvailability_1.ResourceAvailability();
        return _this;
    }
    return ResourceAvailabilityRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceAvailabilityRepository = ResourceAvailabilityRepository;
var ResourceTypeRepository = /** @class */ (function (_super) {
    __extends(ResourceTypeRepository, _super);
    function ResourceTypeRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new ResourceType_1.ResourceType();
        return _this;
    }
    return ResourceTypeRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceTypeRepository = ResourceTypeRepository;
var ResourceCategoryRepository = /** @class */ (function (_super) {
    __extends(ResourceCategoryRepository, _super);
    function ResourceCategoryRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new ResourceCategory_1.ResourceCategory();
        return _this;
    }
    return ResourceCategoryRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceCategoryRepository = ResourceCategoryRepository;
var ResourceRepository = /** @class */ (function (_super) {
    __extends(ResourceRepository, _super);
    function ResourceRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Resource_1.ResourceCreate();
        return _this;
    }
    return ResourceRepository;
}(BaseRepository_1.BaseRepository));
exports.ResourceRepository = ResourceRepository;
var FavoriteRepository = /** @class */ (function (_super) {
    __extends(FavoriteRepository, _super);
    function FavoriteRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Favorite_1.Favorite();
        return _this;
    }
    return FavoriteRepository;
}(BaseRepository_1.BaseRepository));
exports.FavoriteRepository = FavoriteRepository;
var UserRepository = /** @class */ (function (_super) {
    __extends(UserRepository, _super);
    function UserRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new User_1.UserCreate();
        return _this;
    }
    return UserRepository;
}(BaseRepository_1.BaseRepository));
exports.UserRepository = UserRepository;
var FeedbackRepository = /** @class */ (function (_super) {
    __extends(FeedbackRepository, _super);
    function FeedbackRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new Feedback_1.FeedbackCreate();
        return _this;
    }
    return FeedbackRepository;
}(BaseRepository_1.BaseRepository));
exports.FeedbackRepository = FeedbackRepository;
var UserStatusRepository = /** @class */ (function (_super) {
    __extends(UserStatusRepository, _super);
    function UserStatusRepository() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = new UserStatus_1.UserStatus();
        return _this;
    }
    return UserStatusRepository;
}(BaseRepository_1.BaseRepository));
exports.UserStatusRepository = UserStatusRepository;
