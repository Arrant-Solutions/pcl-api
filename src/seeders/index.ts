import {branchService} from '../loaders/services'
import branches from './branches'

const seed = async () => {
  console.log('started seeding....')

  await branchService
    .insertMany(branches)
    .then(({statusCode}) => {
      if (statusCode === 200) console.log('Branches inserted successfully')
      else console.log('Failed to insert branches')
    })
    .catch(error => console.log(error))

  console.log('finished seeding....')
}

seed()
