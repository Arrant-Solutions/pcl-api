import {name, datatype, internet, phone, date} from 'faker'

const users: any[] = []

for (let i = 0; i < 30; i += 1) {
  users.push({
    user_id: i + 1,
    first_name: name.firstName(),
    last_name: name.lastName(),
    email: internet.email(),
    phone: phone.phoneNumber(),
    password: '5tron&',
    date_of_birth: date.past(7),
    user_group_id: datatype.number({min: 1, max: 4}),
    country_id: datatype.number({min: 1, max: 250}),
    gender_id: datatype.number({min: 1, max: 2}),
    branch_id: datatype.number({min: 1, max: 2}),
    user_status_id: datatype.number({min: 1, max: 4}),
  })
}

export default users
