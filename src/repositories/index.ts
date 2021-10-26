/* eslint-disable max-classes-per-file */
import {Branch, IBranch} from '../models/Branch'
import {Country, ICountry} from '../models/Country'
import {Gender, IGender} from '../models/Gender'
import {IMediaType, MediaType} from '../models/MediaType'
import {IResourceAvailability, ResourceAvailability} from '../models/ResourceAvailability'
import {IResourceCategory, ResourceCategory} from '../models/ResourceCategory'
import {IResourceType, ResourceType} from '../models/ResourceType'
import {ICreateUserT} from '../models/User'
import {IUserGroup, UserGroup} from '../models/UserGroup'
import {BaseRepository} from './BaseRepository'
import {IUserStatus} from '../models/UserStatus'
import {ResourceCreateT} from '../models/Resource'
import {CreateFavoriteT, Favorite} from '../models/Favorite'
import {FeedbackCreate, FeedbackCreateT} from '../models/Feedback'

export class BranchRepository extends BaseRepository<IBranch, Branch> {}

export class CountryRepository extends BaseRepository<ICountry, Country> {}

export class GenderRepository extends BaseRepository<IGender, Gender> {}

export class UserGroupRepository extends BaseRepository<IUserGroup, UserGroup> {}

export class MediaTypeRepository extends BaseRepository<IMediaType, MediaType> {}

export class ResourceAvailabilityRepository extends BaseRepository<
  IResourceAvailability,
  ResourceAvailability
> {}

export class ResourceTypeRepository extends BaseRepository<
  IResourceType,
  ResourceType
> {}

export class ResourceCategoryRepository extends BaseRepository<
  IResourceCategory,
  ResourceCategory
> {}

export class ResourceRepository extends BaseRepository<
  ResourceCreateT,
  FeedbackCreate
> {}

export class FavoriteRepository extends BaseRepository<CreateFavoriteT, Favorite> {}

export class UserRepository extends BaseRepository<
  ICreateUserT,
  FeedbackCreate
> {}

export class FeedbackRepository extends BaseRepository<
  FeedbackCreateT,
  FeedbackCreate
> {
  model = new FeedbackCreate()
}

export class UserStatusRepository extends BaseRepository<
  IUserStatus,
  FeedbackCreate
> {}
