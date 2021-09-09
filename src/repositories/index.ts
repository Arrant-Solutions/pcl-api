/* eslint-disable max-classes-per-file */
import {IBranch} from '../models/branch'
import {ICountry} from '../models/country'
import {IGender} from '../models/gender'
import {IUser} from '../models/user'
import {IUserGroup} from '../models/user_group'
import {BaseRepository} from './BaseRepository'

export class BranchRepository extends BaseRepository<IBranch> {}

export class CountryRepository extends BaseRepository<ICountry> {}

export class GenderRepository extends BaseRepository<IGender> {}

export class UserGroupRepository extends BaseRepository<IUserGroup> {}

export class UserRepository extends BaseRepository<IUser> {}
