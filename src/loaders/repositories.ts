import BranchRepository from '../repositories/BranchRepository'
import CountryRepository from '../repositories/CountryRepository'
import GenderRepository from '../repositories/GenderRepository'
import UserGroupRepository from '../repositories/UserGroupRepository'
import UserRepository from '../repositories/UserRepository'

export const branchRepository = new BranchRepository({
  tableName: 'branches',
  columns: ['branch_name'],
})
export const countryRepository = new CountryRepository({
  tableName: 'countries',
  columns: ['country_name', 'country_abbr'],
  idColumn: 'country_id',
})
export const genderRepository = new GenderRepository({
  tableName: 'genders',
  columns: ['gender_name'],
})
export const userGroupRepository = new UserGroupRepository({
  tableName: 'user_groups',
  columns: ['user_group_name'],
})
export const userRepository = new UserRepository({
  tableName: 'users',
  columns: [
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
  ],
})
