/* eslint-disable max-classes-per-file */
import {IBranch} from '../models/branch'
import {ICountry} from '../models/country'
import {IGender} from '../models/gender'
import {IUser} from '../models/user'
import {IUserGroup} from '../models/user_group'
import BaseService from './BaseService'

export class BranchService extends BaseService<IBranch> {}

export class CountryService extends BaseService<ICountry> {}

export class GenderService extends BaseService<IGender> {}

export class UserGroupService extends BaseService<IUserGroup> {}

export class UserService extends BaseService<IUser> {}
