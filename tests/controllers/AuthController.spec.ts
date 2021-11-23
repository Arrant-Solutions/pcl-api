/* eslint-disable no-undef */
import * as supertest from 'supertest'
import {internet, name} from 'faker'
import app from '../../src/app'
import {API_VERSION} from '../../src/config'
import {userService} from '../../src/loaders/services'

const user = {
  user_id: 90000,
  first_name: name.firstName(),
  last_name: name.lastName(),
  email: internet.email(),
  password: 'Appl3PC!',
  date_of_birth: '1981-11-02T00:00:00.000Z',
  is_member: true,
  branch_id: 1,
  gender_id: 1,
  country_id: 249,
}

const auth = {token: '', user_id: 0}

jest.setTimeout(30000)

describe('Auth Test Suite', () => {
  // beforeAll(async () => {
  //   await userService.executeRawQuery('DELETE FROM user_branch_pivot where 1>0')
  //   await userService.executeRawQuery('DELETE FROM users where email = $1', [
  //     user.email,
  //   ])
  // })

  it(`it /api/${API_VERSION}/auth/register should register a user`, async () => {
    const res = await supertest(app)
      .post(`/api/${API_VERSION}/auth/register`)
      .send(user)

    // console.log(res.body)
    // expect(2).toBe(2)
    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    expect(res.body.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy()
    expect(res.body.data).toHaveProperty('token')
    expect(res.body.data.token).toBeTruthy()
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toBeTruthy()
    expect(res.body.data.user.user_id).toBeTruthy()
    expect(res.body.data.user.first_name).toBe(user.first_name)
    expect(res.body.data.user.last_name).toBe(user.last_name)
    expect(res.body.data.user.email).toBe(user.email)
    expect(res.body.data.user.branch_id).toBe(user.branch_id)
    expect(res.body.data.user.gender_id).toBe(user.gender_id)
    expect(res.body.data.user.country_id).toBe(user.country_id)

    auth.token = res.body.data.token
    auth.user_id = res.body.data.user.user_id
  })

  it(`it /api/${API_VERSION}/auth/fetchUser/:email should find a user with given email`, async () => {
    const res = await supertest(app).get(
      `/api/${API_VERSION}/auth/fetchUser/${user.email}`,
    )

    // console.log(res.body)
    // expect(2).toBe(2)
    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    expect(res.body.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy()
    expect(res.body.data).toHaveProperty('token')
    expect(res.body.data.token).toBeTruthy()
    expect(res.body.data).toHaveProperty('user')
    expect(res.body.data.user).toBeTruthy()
    expect(res.body.data.user.first_name).toBe(user.first_name)
    expect(res.body.data.user.last_name).toBe(user.last_name)
    expect(res.body.data.user.email).toBe(user.email)
    expect(res.body.data.user.branch_id).toBe(user.branch_id)
    expect(res.body.data.user.gender_id).toBe(user.gender_id)
    expect(res.body.data.user.country_id).toBe(user.country_id)
  })

  it(`it /api/${API_VERSION}/auth/:user_id should update a user with given user_id`, async () => {
    const res = await supertest(app)
      .put(`/api/${API_VERSION}/auth/${auth.user_id}`)
      // .auth(auth.token, {type: 'bearer'})
      .send({
        first_name: 'NewFName',
      })

    console.log(res.status, auth, res.body)
    // expect(2).toBe(2)
    expect(res.status).toBe(200)
    // expect(res.body).toBeTruthy()
    // expect(res.body.statusCode).toBe(200)
    // expect(res.body.data).toBeTruthy()
    // expect(res.body.data).toHaveProperty('token')
    // expect(res.body.data.token).toBeTruthy()
    // expect(res.body.data).toHaveProperty('user')
    // expect(res.body.data.user).toBeTruthy()
    // expect(res.body.data.user.first_name).toBe(user.first_name)
    // expect(res.body.data.user.last_name).toBe(user.last_name)
    // expect(res.body.data.user.email).toBe(user.email)
    // expect(res.body.data.user.branch_id).toBe(user.branch_id)
    // expect(res.body.data.user.gender_id).toBe(user.gender_id)
    // expect(res.body.data.user.country_id).toBe(user.country_id)
  })

  afterAll(async () => {
    await userService.executeRawQuery('DELETE FROM user_branch_pivot where 1>0')
    await userService.executeRawQuery('DELETE FROM users where email = $1', [
      user.email,
    ])
  })
})
