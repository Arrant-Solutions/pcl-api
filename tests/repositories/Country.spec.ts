/* eslint-disable import/newline-after-import */
/* eslint-disable no-undef */
import 'reflect-metadata'
import {config} from 'dotenv'
config()
// eslint-disable-next-line import/first
import {CountryRepository} from '../../src/repositories'

const service = new CountryRepository({
  tableName: 'countries',
  columns: ['country_name', 'country_abbr', 'country_code'],
  idColumn: 'country_id',
})
describe('Country Repository Suite', () => {
  it('should add a country', async () => {
    const result = await service.insert(
      {
        country_id: 901,
        country_name: 'Zondani',
        country_code: 'ZED',
        country_abbr: 'ZED',
      },
      true,
    )

    expect(result).toBeTruthy()
    expect(result).not.toBeInstanceOf(Array)
  })

  it('should delete a country', async () => {
    await service.insert(
      {
        country_id: 902,
        country_name: 'Zonda Uza Lema',
        country_code: 'ZUL',
        country_abbr: 'ZUL',
      },
      true,
    )

    const del = await service.delete(
      {
        country_id: 902,
        country_name: 'Zonda Uza Lema',
      },
      true,
    )

    expect(del).toBeTruthy()
    expect(del).not.toBeInstanceOf(Array)

    if (del) {
      expect(del.country_id).toBe(902)
      expect(del.country_name).toBe('Zonda Uza Lema')
    }
  })

  it('should update a country', async () => {
    await service.insert(
      {
        country_id: 903,
        country_name: 'Zonda Uza',
        country_code: 'ZU',
        country_abbr: 'ZU',
      },
      true,
    )

    const update = await service.update(903, {
      country_id: 903,
      country_name: 'Zonda Uza Nafuti',
    })

    expect(update).toBeTruthy()
    expect(update).not.toBeInstanceOf(Array)

    if (update && !Array.isArray(update)) {
      expect(update.country_id).toBe(903)
      expect(update.country_name).toBe('Zonda Uza Nafuti')
    }
  })

  afterAll(async () => {
    await service.executeRawQuery(
      'delete from countries where country_id > $1',
      [900],
    )
  })
})
