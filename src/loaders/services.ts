import {
  BranchRepository,
  CountryRepository,
  GenderRepository,
  MediaTypeRepository,
  ResourceAvailabilityRepository,
  ResourceCategoryRepository,
  ResourceRepository,
  ResourceTypeRepository,
  UserGroupRepository,
  UserRepository,
  UserStatusRepository,
} from '../repositories'
import AuthService from '../services/AuthService'
import BranchService from '../services/BranchService'
import CountryService from '../services/CountryService'
import GenderService from '../services/GenderService'
import MediaTypeService from '../services/MediaTypeService'
import ResourceAvailabilityService from '../services/ResourceAvailabilityService'
import ResourceCategoryService from '../services/ResourceCategoryService'
import ResourceService from '../services/ResourceService'
import ResourceTypeService from '../services/ResourceTypeService'
import UserGroupService from '../services/UserGroupService'
import UserService from '../services/UserService'
import UserStatusService from '../services/UserStatusService'

export const branchService = new BranchService(
  new BranchRepository({
    tableName: 'branches',
    columns: ['branch_name'],
  }),
)

export const countryService = new CountryService(
  new CountryRepository({
    tableName: 'countries',
    columns: ['country_name', 'country_abbr', 'country_code'],
    idColumn: 'country_id',
  }),
)
export const genderService = new GenderService(
  new GenderRepository({
    tableName: 'genders',
    columns: ['gender_name'],
  }),
)
export const userGroupService = new UserGroupService(
  new UserGroupRepository({
    tableName: 'user_groups',
    columns: ['user_group_name'],
    idColumn: 'user_group_id',
  }),
)
export const mediaTypeService = new MediaTypeService(
  new MediaTypeRepository({
    tableName: 'media_types',
    columns: ['media_type_name'],
    idColumn: 'media_type_id',
  }),
)
export const resourceAvailabilityService = new ResourceAvailabilityService(
  new ResourceAvailabilityRepository({
    tableName: 'resource_availability',
    columns: ['resource_availability_name'],
    idColumn: 'resource_availability_id',
  }),
)
export const resourceCategoryService = new ResourceCategoryService(
  new ResourceCategoryRepository({
    tableName: 'resource_categories',
    columns: ['resource_category_name'],
    idColumn: 'resource_category_id',
  }),
)

export const resourceTypeService = new ResourceTypeService(
  new ResourceTypeRepository({
    tableName: 'resource_types',
    columns: ['resource_type_name'],
    idColumn: 'resource_type_id',
  }),
)

export const userStatusService = new UserStatusService(
  new UserStatusRepository({
    tableName: 'user_statuses',
    columns: ['user_status_name'],
    idColumn: 'user_status_id',
  }),
)

export const userService = new UserService(
  new UserRepository({
    tableName: 'users',
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
  }),
)

export const resourceService = new ResourceService(
  new ResourceRepository({
    idColumn: 'resource_id',
    tableName: 'resources',
    columns: [
      'resource_id',
      'title',
      'description',
      'author',
      'resource_url',
      'thumbnail_url',

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
      'resource_category_name',
      'resource_type_name',
      'resource_availability_name',
      'media_type_name',
    ],
  }),
)

export const authService = new AuthService(userService)
