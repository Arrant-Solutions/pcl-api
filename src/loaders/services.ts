import {
  BranchRepository,
  CountryRepository,
  GenderRepository,
  UserGroupRepository,
  UserRepository,
} from '../repositories'
import BranchService from '../services/BranchService'
import CountryService from '../services/CountryService'
import GenderService from '../services/GenderService'
import UserGroupService from '../services/UserGroupService'
import UserService from '../services/UserService'

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
  }),
)
export const userService = new UserService(
  new UserRepository({
    tableName: 'users',
    columns: [
      'first_name',
      'last_name',
      'email',
      'phone',
      'date_of_birth',
      'user_group_name',
      'user_group_id',
      // 'branch_name',
      // 'branch_id',
      'country_name',
      'country_id',
      'country_abbr',
      'gender_name',
      'gender_id',
    ],
  }),
)
