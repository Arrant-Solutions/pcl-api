import {Optional} from '../types'
import {IModel, Model} from './IModel'
import {IMediaType, MediaType} from './MediaType'
import {
  IResourceAvailability,
  ResourceAvailability,
} from './ResourceAvailability'
import {IResourceType, ResourceType} from './ResourceType'
import {IResourceCategory, ResourceCategory} from './resource_category'
import {IUser, IUserView} from './User'

export interface IResource extends IModel {
  resource_id: number
  title: string
  description: string
  author: string
  resource_url: string
  thumbnail_url: string
  user: IUser
  resource_category: ResourceCategory
  resource_type: ResourceType
  resource_availability: ResourceAvailability
  media_type: MediaType
}

export interface IResourceCreate {
  resource_id: number
  title: string
  description: string
  author: string
  resource_url: string
  thumbnail_url: string
  user_id: number
  resource_category_id: number
  resource_type_id: number
  resource_availability_id: number
  media_type_id: number
}

export type IResourceView = IResource &
  IUserView &
  IMediaType &
  IResourceAvailability &
  IResourceType &
  IResourceCategory

export class Resource extends Model implements IResource {
  resource_id: number
  title: string
  description: string
  author: string
  resource_url: string
  thumbnail_url: string
  user: IUser
  resource_category: ResourceCategory
  resource_type: ResourceType
  resource_availability: ResourceAvailability
  media_type: MediaType

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
      >,
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
    }
  }
}
