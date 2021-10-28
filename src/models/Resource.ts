// eslint-disable-next-line max-classes-per-file
import {
  IsOptional,
  IsInt,
  IsPositive,
  IsString,
  MaxLength,
} from 'class-validator'
import {Optional} from '../types'
import {IAuthor} from './Author'
import {ICreate, IModel, Model} from './IModel'
import {IMediaType} from './MediaType'
import {IResourceAvailability} from './ResourceAvailability'
import {IResourceType} from './ResourceType'
import {IResourceCategory} from './ResourceCategory'
import {IUser, IUserView} from './User'

export interface IResource extends IModel {
  resource_id: number
  title: string
  description: string
  author: IAuthor
  resource_url: string
  thumbnail_url: string
  user: IUser
  resource_category: IResourceCategory
  resource_type: IResourceType
  resource_availability: IResourceAvailability
  media_type: IMediaType
}

export interface IResourceCreate {
  resource_id: number
  title: string
  description: string
  author: IAuthor
  resource_url: string
  thumbnail_url: string
  user_id: number
  resource_category_id: number
  resource_type_id: number
  resource_availability_id: number
  media_type_id: number
}

export type ResourceCreateT = Optional<
  IResource & IResourceCreate,
  | 'user'
  | 'resource_category'
  | 'resource_type'
  | 'resource_availability'
  | 'media_type'
  | 'resource_category_id'
  | 'resource_type_id'
  | 'resource_availability_id'
  | 'media_type_id'
>

export class ResourceCreate implements
    Omit<IResourceCreate, 'author'>,
    ICreate<Omit<IResourceCreate, 'author'> & {author_id: number}>
{
  @IsOptional()
  @IsInt()
  @IsPositive()
  resource_id: number

  @IsString()
  @MaxLength(250)
  title: string

  @IsString()
  @MaxLength(255)
  description: string

  @IsInt()
  @IsPositive()
  author_id: number

  @IsString()
  @MaxLength(255)
  resource_url: string

  @IsString()
  @MaxLength(255)
  thumbnail_url: string

  @IsInt()
  @IsPositive()
  user_id: number

  @IsInt()
  @IsPositive()
  resource_category_id: number

  @IsInt()
  @IsPositive()
  resource_type_id: number

  @IsInt()
  @IsPositive()
  resource_availability_id: number

  @IsInt()
  @IsPositive()
  media_type_id: number

  set assign({
    resource_id,
    title,
    description,
    author_id,
    resource_url,
    thumbnail_url,
    user_id,
    resource_availability_id,
    resource_type_id,
    resource_category_id,
    media_type_id,
  }: Omit<IResourceCreate, 'author'> & {author_id: number}) {
    this.resource_id = resource_id
    this.title = title
    this.description = description
    this.author_id = author_id
    this.resource_url = resource_url
    this.thumbnail_url = thumbnail_url
    this.user_id = user_id
    this.resource_availability_id = resource_availability_id
    this.resource_type_id = resource_type_id
    this.resource_category_id = resource_category_id
    this.media_type_id = media_type_id
  }
}

export type IResourceView = IResource &
  IUserView &
  IMediaType &
  IResourceAvailability &
  IResourceType &
  IResourceCategory &
  IAuthor

export class Resource extends Model implements IResource {
  resource_id: number
  title: string
  description: string
  resource_url: string
  thumbnail_url: string
  user: IUser
  resource_category: IResourceCategory
  resource_type: IResourceType
  resource_availability: IResourceAvailability
  media_type: IMediaType
  author: IAuthor

  constructor(
    arg: Optional<
      IResource,
      | 'user'
      | 'resource_category'
      | 'resource_type'
      | 'resource_availability'
      | 'media_type'
    > &
      Partial<
        IUserView &
          IMediaType &
          IResourceAvailability &
          IResourceType &
          IResourceCategory
      > & {
        author_id: number
        author_title: string
        author_first_name: string
        author_last_name: string
        author_suffix: string
      },
  ) {
    super()
    if (arg.resource_category_name && arg.resource_type_name) {
      this.resource_id = arg.resource_id
      this.title = arg.title
      this.description = arg.description
      this.author = arg.author
      this.resource_url = arg.resource_url
      this.thumbnail_url = arg.thumbnail_url
      this.user = {
        user_id: arg.user_id,
        first_name: arg.first_name,
        last_name: arg.last_name,
        email: arg.email,
        phone: arg.phone,
        date_of_birth: arg.date_of_birth,
        user_group: {
          user_group_id: arg.user_group_id,
          user_group_name: arg.user_group_name,
        },
        country: {
          country_id: arg.country_id,
          country_name: arg.country_name,
          country_abbr: arg.country_abbr,
          country_code: arg.country_code,
        },
        gender: {
          gender_id: arg.gender_id,
          gender_name: arg.gender_name,
        },
        branch: {
          branch_id: arg.branch_id,
          branch_name: arg.branch_name,
        },
        user_status: {
          user_status_id: arg.user_status_id,
          user_status_name: arg.user_status_name,
        },
      }
      this.resource_category = {
        resource_category_id: arg.resource_category_id,
        resource_category_name: arg.resource_category_name,
      }
      this.resource_type = {
        resource_type_id: arg.resource_type_id,
        resource_type_name: arg.resource_type_name,
      }
      this.resource_availability = {
        resource_availability_id: arg.resource_availability_id,
        resource_availability_name: arg.resource_availability_name,
      }
      this.media_type = {
        media_type_id: arg.media_type_id,
        media_type_name: arg.media_type_name,
      }
      this.author = {
        author_id: arg.author_id,
        title: arg.author_title,
        first_name: arg.author_first_name,
        last_name: arg.author_last_name,
        suffix: arg.author_suffix,
      }
    }
  }
}
