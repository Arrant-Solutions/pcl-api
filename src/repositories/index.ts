/* eslint-disable max-classes-per-file */
import {Branch, IBranch} from '../models/Branch'
import {Country, ICountry} from '../models/Country'
import {Gender, IGender} from '../models/Gender'
import {IMediaType, MediaType} from '../models/MediaType'
import {
  IResourceAvailability,
  ResourceAvailability,
} from '../models/ResourceAvailability'
import {IResourceCategory, ResourceCategory} from '../models/ResourceCategory'
import {IResourceType, ResourceType} from '../models/ResourceType'
import {ICreateUserT, UserCreate} from '../models/User'
import {IUserGroup, UserGroup} from '../models/UserGroup'
import {BaseRepository} from './BaseRepository'
import {IUserStatus, UserStatus} from '../models/UserStatus'
import {ResourceCreate, ResourceCreateT} from '../models/Resource'
import {CreateFavoriteT, Favorite} from '../models/Favorite'
import {FeedbackCreate, FeedbackCreateT} from '../models/Feedback'

export class BranchRepository extends BaseRepository<IBranch, Branch> {
  model = new Branch()
}

export class CountryRepository extends BaseRepository<ICountry, Country> {
  model = new Country()
}

export class GenderRepository extends BaseRepository<IGender, Gender> {
  model = new Gender()
}

export class UserGroupRepository extends BaseRepository<IUserGroup, UserGroup> {
  model = new UserGroup()
}

export class MediaTypeRepository extends BaseRepository<IMediaType, MediaType> {
  model = new MediaType()
}

export class ResourceAvailabilityRepository extends BaseRepository<
  IResourceAvailability,
  ResourceAvailability
> {
  model = new ResourceAvailability()
}

export class ResourceTypeRepository extends BaseRepository<
  IResourceType,
  ResourceType
> {
  model = new ResourceType()
}

export class ResourceCategoryRepository extends BaseRepository<
  IResourceCategory,
  ResourceCategory
> {
  model = new ResourceCategory()
}

export class ResourceRepository extends BaseRepository<
  ResourceCreateT,
  ResourceCreate
> {
  model = new ResourceCreate()
}

export class FavoriteRepository extends BaseRepository<CreateFavoriteT, Favorite> {
  model = new Favorite()
}

export class UserRepository extends BaseRepository<ICreateUserT, UserCreate> {
  model = new UserCreate()
}

export class FeedbackRepository extends BaseRepository<
  FeedbackCreateT,
  FeedbackCreate
> {
  model = new FeedbackCreate()
}

export class UserStatusRepository extends BaseRepository<IUserStatus, UserStatus> {
  model = new UserStatus()
}
