import {name, datatype, internet, phone, date} from 'faker'

const users: any[] = []

for (let i = 0; i < 100; i += 1) {
  users.push({
    user_id: 1,
    first_name: name.firstName(),
    last_name: name.lastName(),
    email: internet.email(),
    phone: phone.phoneNumber(),
    password: '5tron&',
    date_of_birth: date.past(7),
    user_group_id: datatype.number(4),
    country_id: datatype.number(254),
    gender_id: datatype.number(3),
    branch_id: datatype.number(2),
  })
}

export default users
