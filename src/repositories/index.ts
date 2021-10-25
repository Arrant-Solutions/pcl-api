/* eslint-disable max-classes-per-file */
import {IBranch} from '../models/Branch'
import {ICountry} from '../models/Country'
import {IGender} from '../models/Gender'
import {IMediaType} from '../models/MediaType'
import {IResourceAvailability} from '../models/ResourceAvailability'
import {IResourceCategory} from '../models/resource_category'
import {IResourceType} from '../models/ResourceType'
import {ICreateUserT} from '../models/User'
import {IUserGroup} from '../models/UserGroup'
import {BaseRepository} from './BaseRepository'
import {IUserStatus} from '../models/UserStatus'
import {ResourceCreateT} from '../models/Resource'
import {CreateFavoriteT} from '../models/Favorite'
import {FeedbackCreateT} from '../models/Feedback'

export class BranchRepository extends BaseRepository<IBranch> {}

export class CountryRepository extends BaseRepository<ICountry> {}

export class GenderRepository extends BaseRepository<IGender> {}

export class UserGroupRepository extends BaseRepository<IUserGroup> {}

export class MediaTypeRepository extends BaseRepository<IMediaType> {}

export class ResourceAvailabilityRepository extends BaseRepository<IResourceAvailability> {}

export class ResourceTypeRepository extends BaseRepository<IResourceType> {}

export class ResourceCategoryRepository extends BaseRepository<IResourceCategory> {}

export class ResourceRepository extends BaseRepository<ResourceCreateT> {}

export class FavoriteRepository extends BaseRepository<CreateFavoriteT> {}

export class UserRepository extends BaseRepository<ICreateUserT> { }

export class FeedbackRepository extends BaseRepository<FeedbackCreateT> {}

export class UserStatusRepository extends BaseRepository<IUserStatus> {}
