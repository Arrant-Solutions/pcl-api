/* eslint-disable no-undef */
/* eslint-disable import/first */
/* eslint-disable import/newline-after-import */
import * as supertest from 'supertest'
import app from '../../src/app'
import {API_VERSION} from '../../src/config'

jest.setTimeout(15000)

describe('Assets Suite', () => {
  it(`/api/${API_VERSION}/assets should return signup resources`, async () => {
    const res = await supertest(app).get(`/api/${API_VERSION}/assets`)

    expect(res.status).toBe(200)
    expect(res.body.statusCode).toBe(200)
    expect(res.body.data).toBeTruthy()
    expect(res.body.data).toHaveProperty('userStatuses')
    expect(res.body.data.userStatuses).toBeInstanceOf(Array)
    expect(res.body.data).toHaveProperty('userGroups')
    expect(res.body.data.userGroups).toBeInstanceOf(Array)
    expect(res.body.data).toHaveProperty('countries')
    expect(res.body.data.countries).toBeInstanceOf(Array)
    expect(res.body.data).toHaveProperty('genders')
    expect(res.body.data.genders).toBeInstanceOf(Array)
    expect(res.body.data).toHaveProperty('branches')
    expect(res.body.data.branches).toBeInstanceOf(Array)
  })
})
