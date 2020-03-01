const {
  generateForDay,
  generateForWeek,
} = require('../../src/utils/generateDates.js')
const dateTemplates = require('../../static/dateTemplates.json')

describe('Date generation tests', () => {
  it('should generate dates for week', async () => {
    // given
    const monday = { year: 2019, month: 1, day: 6 }
    const template = dateTemplates['evenWeek']

    // when
    const dates = generateForWeek(monday, template)

    // then
    expect(dates).toHaveLength(80)

    expect(dates[0]).toEqual({
      timestamp: 1546786800000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 16,
      minute: 0,

      zone: 'Europe/Budapest',

      offset: 60,
    })

    expect(dates[1]).toEqual({
      timestamp: 1546787700000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 16,
      minute: 15,

      zone: 'Europe/Budapest',

      offset: 60,
    })

    expect(dates[15]).toEqual({
      timestamp: 1546800300000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 19,
      minute: 45,

      zone: 'Europe/Budapest',

      offset: 60,
    })

    expect(dates[16]).toEqual({
      timestamp: 1546858800000,

      year: 2019,
      month: 1,
      day: 7,
      hour: 12,
      minute: 0,

      zone: 'Europe/Budapest',

      offset: 60,
    })
  })

  it('should generate dates for one day', async () => {
    // given
    const monday = { year: 2019, month: 1, day: 6 }
    const template = dateTemplates['oddWeek']
    const fridayIndex = 4

    // when
    const dates = generateForDay(monday, template, fridayIndex)

    // then
    expect(dates).toHaveLength(24)

    expect(dates[0]).toEqual({
      timestamp: 1546759800000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 8,
      minute: 30,

      zone: 'Europe/Budapest',

      offset: 60,
    })

    expect(dates[1]).toEqual({
      timestamp: 1546760700000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 8,
      minute: 45,

      zone: 'Europe/Budapest',

      offset: 60,
    })

    expect(dates[23]).toEqual({
      timestamp: 1546780500000,

      year: 2019,
      month: 1,
      day: 6,
      hour: 14,
      minute: 15,

      zone: 'Europe/Budapest',

      offset: 60,
    })
  })
})
