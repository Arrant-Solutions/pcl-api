/* eslint-disable import/first */
// eslint-disable-next-line import/newline-after-import
import {config} from 'dotenv'
config()

import {
  branchService,
  countryService,
  genderService,
  mediaTypeService,
  resourceAvailabilityService,
  resourceCategoryService,
  resourceTypeService,
  userGroupService,
  userService,
  userStatusService,
} from '../loaders/services'
import branches from './branches'
import countries from './countries'
import genders from './genders'
import media_types from './media_types'
import resource_availability from './resource_availability'
import resource_categories from './resource_categories'
import resource_types from './resource_types'
import users from './users'
import user_groups from './user_groups'
import user_statuses from './user_statuses'

const seed = async () => {
  console.log(`Running in ${process.env.ENV} mode`)
  console.log('started seeding....', process.env.ENV)

  await branchService
    .insertMany(branches, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('Branches inserted successfully')
      else console.log('Failed to insert branches')
    })
    .catch(error => console.log(error))

  await countryService
    .insertMany(countries, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('Countries inserted successfully')
      else console.log('Failed to insert Countries')
    })
    .catch(error => console.log(error))

  await genderService
    .insertMany(genders, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('Genders inserted successfully')
      else console.log('Failed to insert Genders')
    })
    .catch(error => console.log(error))

  await mediaTypeService
    .insertMany(media_types, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('MediaTypes inserted successfully')
      else console.log('Failed to insert MediaType')
    })
    .catch(error => console.log(error))

  await resourceAvailabilityService
    .insertMany(resource_availability, true)
    .then(({statusCode}) => {
      if (statusCode === 200)
        console.log('ResourceAvailability inserted successfully')
      else console.log('Failed to insert ResourceAvailability')
    })
    .catch(error => console.log(error))

  await resourceCategoryService
    .insertMany(resource_categories, true)
    .then(({statusCode}) => {
      if (statusCode === 200)
        console.log('ResourceCategories inserted successfully')
      else console.log('Failed to insert ResourceCategories')
    })
    .catch(error => console.log(error))

  await resourceTypeService
    .insertMany(resource_types, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('ResourceTypes inserted successfully')
      else console.log('Failed to insert ResourceTypes')
    })
    .catch(error => console.log(error))

  await userGroupService
    .insertMany(user_groups, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('UserGroups inserted successfully')
      else console.log('Failed to insert UserGroups')
    })
    .catch(error => console.log(error))

  await userStatusService
    .insertMany(user_statuses, true)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('UserStatus inserted successfully')
      else console.log('Failed to insert UserStatus')
    })
    .catch(error => console.log(error))

  await userService
    .insertMany(users, true)
    .then(({statusCode, data}) => {
      console.log(data)
      if (statusCode === 200) console.log('Users inserted successfully')
      else console.log('Failed to insert Users')
    })
    .catch(error => console.log(error))

  console.log('finished seeding....')
}

seed()
