import moment = require('moment')

export const getAgeYears = (date: string, format = 'YYYY-MM-DD'): number => {
  const result = moment(date, format).fromNow()

  if (!/year/i.test(result)) return 0

  return Number(result.split(' ')[0])
}

export const isUnderAge = (date: string, format = 'YYYY-MM-DD'): boolean =>
  getAgeYears(date, format) < 2
