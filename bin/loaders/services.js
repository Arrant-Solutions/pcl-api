"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.favoriteService = exports.resourceService = exports.userService = exports.userStatusService = exports.resourceTypeService = exports.resourceCategoryService = exports.resourceAvailabilityService = exports.mediaTypeService = exports.userGroupService = exports.genderService = exports.countryService = exports.branchService = void 0;
var repositories_1 = require("../repositories");
var AuthService_1 = require("../services/AuthService");
var BranchService_1 = require("../services/BranchService");
var CountryService_1 = require("../services/CountryService");
var FavoritesService_1 = require("../services/FavoritesService");
var GenderService_1 = require("../services/GenderService");
var MediaTypeService_1 = require("../services/MediaTypeService");
var ResourceAvailabilityService_1 = require("../services/ResourceAvailabilityService");
var ResourceCategoryService_1 = require("../services/ResourceCategoryService");
var ResourceService_1 = require("../services/ResourceService");
var ResourceTypeService_1 = require("../services/ResourceTypeService");
var UserGroupService_1 = require("../services/UserGroupService");
var UserService_1 = require("../services/UserService");
var UserStatusService_1 = require("../services/UserStatusService");
exports.branchService = new BranchService_1.default(new repositories_1.BranchRepository({
    tableName: 'branches',
    columns: ['branch_name'],
}));
exports.countryService = new CountryService_1.default(new repositories_1.CountryRepository({
    tableName: 'countries',
    columns: ['country_name', 'country_abbr', 'country_code'],
    idColumn: 'country_id',
}));
exports.genderService = new GenderService_1.default(new repositories_1.GenderRepository({
    tableName: 'genders',
    columns: ['gender_name'],
}));
exports.userGroupService = new UserGroupService_1.default(new repositories_1.UserGroupRepository({
    tableName: 'user_groups',
    columns: ['user_group_name'],
    idColumn: 'user_group_id',
}));
exports.mediaTypeService = new MediaTypeService_1.default(new repositories_1.MediaTypeRepository({
    tableName: 'media_types',
    columns: ['media_type_name'],
    idColumn: 'media_type_id',
}));
exports.resourceAvailabilityService = new ResourceAvailabilityService_1.default(new repositories_1.ResourceAvailabilityRepository({
    tableName: 'resource_availability',
    columns: ['resource_availability_name'],
    idColumn: 'resource_availability_id',
}));
exports.resourceCategoryService = new ResourceCategoryService_1.default(new repositories_1.ResourceCategoryRepository({
    tableName: 'resource_categories',
    columns: ['resource_category_name'],
    idColumn: 'resource_category_id',
}));
exports.resourceTypeService = new ResourceTypeService_1.default(new repositories_1.ResourceTypeRepository({
    tableName: 'resource_types',
    columns: ['resource_type_name'],
    idColumn: 'resource_type_id',
}));
exports.userStatusService = new UserStatusService_1.default(new repositories_1.UserStatusRepository({
    tableName: 'user_statuses',
    columns: ['user_status_name'],
    idColumn: 'user_status_id',
}));
exports.userService = new UserService_1.default(new repositories_1.UserRepository({
    tableName: 'users',
    viewName: 'user_view',
    columns: [
        'avatar',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'user_group_name',
        'user_group_id',
        'branch_name',
        'branch_id',
        'country_name',
        'country_id',
        'country_abbr',
        'gender_name',
        'gender_id',
        'user_status_id',
        'user_status_name',
    ],
    ignore: [
        'user_group_name',
        'branch_id',
        'country_abbr',
        'branch_name',
        'country_name',
        'gender_name',
        'user_status_name',
    ],
}));
exports.resourceService = new ResourceService_1.default(new repositories_1.ResourceRepository({
    idColumn: 'resource_id',
    tableName: 'resources',
    viewName: 'resource_view',
    columns: [
        'resource_id',
        'title',
        'description',
        'resource_url',
        'thumbnail_url',
        'author_id',
        'author_title',
        'author_first_name',
        'author_last_name',
        'author_suffix',
        'user_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'user_group_name',
        'user_group_id',
        'branch_name',
        'branch_id',
        'country_name',
        'country_id',
        'country_abbr',
        'gender_name',
        'gender_id',
        'user_status_id',
        'user_status_name',
        'resource_category_id',
        'resource_category_name',
        'resource_type_id',
        'resource_type_name',
        'resource_availability_id',
        'resource_availability_name',
        'media_type_id',
        'media_type_name',
    ],
    ignore: [
        'user_group_id',
        'gender_id',
        'branch_id',
        'country_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'user_group_name',
        'branch_name',
        'country_name',
        'country_abbr',
        'gender_name',
        'resource_category_name',
        'resource_type_name',
        'resource_availability_name',
        'media_type_name',
        'author_title',
        'author_first_name',
        'author_last_name',
        'author_suffix',
    ],
}));
exports.favoriteService = new FavoritesService_1.default(new repositories_1.FavoriteRepository({
    idColumn: 'favorite_id',
    tableName: 'favorites',
    viewName: 'favorites_view',
    columns: [
        'favorite_id',
        'resource_id',
        'user_id',
        'author_id',
        'author_title',
        'author_first_name',
        'author_last_name',
        'author_suffix',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'user_group_name',
        'user_group_id',
        'branch_name',
        'branch_id',
        'country_name',
        'country_id',
        'country_abbr',
        'gender_name',
        'gender_id',
        'user_status_id',
        'user_status_name',
        'resource_category_id',
        'resource_category_name',
        'resource_type_id',
        'resource_type_name',
        'resource_availability_id',
        'resource_availability_name',
        'media_type_id',
        'media_type_name',
    ],
    ignore: [
        'author_id',
        'author_title',
        'author_first_name',
        'author_last_name',
        'author_suffix',
        'first_name',
        'last_name',
        'email',
        'phone',
        'date_of_birth',
        'user_group_name',
        'user_group_id',
        'branch_name',
        'branch_id',
        'country_name',
        'country_id',
        'country_abbr',
        'gender_name',
        'gender_id',
        'user_status_id',
        'user_status_name',
        'resource_category_id',
        'resource_category_name',
        'resource_type_id',
        'resource_type_name',
        'resource_availability_id',
        'resource_availability_name',
        'media_type_id',
        'media_type_name',
    ],
}));
exports.authService = new AuthService_1.default(exports.userService);
