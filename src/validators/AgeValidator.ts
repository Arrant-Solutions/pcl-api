/* eslint-disable class-methods-use-this */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator'
import moment = require('moment')

@ValidatorConstraint({name: 'customText', async: false})
export default class IsAppropriateAge implements ValidatorConstraintInterface {
  // eslint-disable-next-line no-unused-vars
  validate(text: string, args: ValidationArguments) {
    const age = moment().diff(text, 'years')

    return age > 0 && age < 150
  }

  defaultMessage(args: ValidationArguments) {
    const dob = new Date(args.value)

    if (Number.isNaN(dob.valueOf())) {
      return 'Please input a valid date of birth'
    }

    const age = moment().diff(args.value, 'years')

    if (age < 1) {
      return 'You might be too old to use the app'
    }

    if (age > 150) {
      return 'You might be too young to use the app'
    }

    return `${args.value} does not look like a valid date of birth`
  }
}
