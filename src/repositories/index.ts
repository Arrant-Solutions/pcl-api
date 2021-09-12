/* eslint-disable max-classes-per-file */
import {IBranch} from '../models/Branch'
import {ICountry} from '../models/Country'
import {IGender} from '../models/Gender'
import {IMediaType} from '../models/MediaType'
import {IResourceAvailability} from '../models/ResourceAvailability'
import {IResourceCategory} from '../models/resource_category'
import {IResourceType} from '../models/ResourceType'
import {IUser} from '../models/User'
import {IUserGroup} from '../models/UserGroup'
import {BaseRepository} from './BaseRepository'
import {IUserStatus} from '../models/UserStatus'

export class BranchRepository extends BaseRepository<IBranch> {}

export class CountryRepository extends BaseRepository<ICountry> {}

export class GenderRepository extends BaseRepository<IGender> {}

export class UserGroupRepository extends BaseRepository<IUserGroup> {}

export class MediaTypeRepository extends BaseRepository<IMediaType> {}

export class ResourceAvailabilityRepository extends BaseRepository<IResourceAvailability> {}

export class ResourceTypeRepository extends BaseRepository<IResourceType> {}

export class ResourceCategoryRepository extends BaseRepository<IResourceCategory> {}

export class UserRepository extends BaseRepository<IUser> {
  public async insert<T>(model: T): Promise<T | false> {
    return super.insert<T>(model)
  }
}

export class UserStatusRepository extends BaseRepository<IUserStatus> {}
