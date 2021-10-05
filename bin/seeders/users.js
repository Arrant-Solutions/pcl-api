"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker_1 = require("faker");
var users = [];
for (var i = 0; i < 30; i += 1) {
    users.push({
        user_id: i + 1,
        first_name: faker_1.name.firstName(),
        last_name: faker_1.name.lastName(),
        email: faker_1.internet.email(),
        phone: faker_1.phone.phoneNumber(),
        password: '5tron&',
        date_of_birth: faker_1.date.past(7),
        user_group_id: faker_1.datatype.number({ min: 1, max: 4 }),
        country_id: faker_1.datatype.number({ min: 1, max: 250 }),
        gender_id: faker_1.datatype.number({ min: 1, max: 2 }),
        branch_id: faker_1.datatype.number({ min: 1, max: 2 }),
        user_status_id: faker_1.datatype.number({ min: 1, max: 4 }),
    });
}
exports.default = users;
