const { newDb, models, clearDb } = require('./util/db.js')
const { loginAsAdmin } = require('./user-actions/journey')
const {
  createSlotsForDay,
  createSlotsForWeek,
} = require('./user-actions/slot-endpoint')

describe('User endpoint tests', () => {
  beforeAll(() => newDb())
  beforeEach(() => clearDb())

  it('should create slots for a day', async () => {
    // given
    const adminToken = await loginAsAdmin({
      googleId: '1',
      email: 'admin@company.com',
    })

    // when
    const response = await createSlotsForDay(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'evenWeek',
        dayIndex: 3,
      },
      { as: adminToken }
    )

    // then
    expect(response.status).toBe(200)
    expect(response.body.partial).toBe(false)

    const slots = await models.Slot.findAll()
    expect(slots).toHaveLength(16)
  })

  it('should create other slots for same day but without duplications', async () => {
    // given
    const adminToken = await loginAsAdmin({
      googleId: '1',
      email: 'admin@company.com',
    })
    await createSlotsForDay(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'evenWeek',
        dayIndex: 3,
      },
      { as: adminToken }
    )

    // when
    const response = await createSlotsForDay(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'evenWeek',
        dayIndex: 0,
      },
      { as: adminToken }
    )

    // then
    expect(response.status).toBe(200)
    expect(response.body.partial).toBe(true)

    const slots = await models.Slot.findAll()
    expect(slots).toHaveLength(24)
  })

  it('should create slots for a week', async () => {
    // given
    const adminToken = await loginAsAdmin({
      googleId: '1',
      email: 'admin@company.com',
    })

    // when
    const response = await createSlotsForWeek(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'evenWeek',
      },
      { as: adminToken }
    )

    // then
    expect(response.status).toBe(200)
    expect(response.body.partial).toBe(false)

    const slots = await models.Slot.findAll()
    expect(slots).toHaveLength(80)
  })

  it('should create other slots for same week but without duplications', async () => {
    // given
    const adminToken = await loginAsAdmin({
      googleId: '1',
      email: 'admin@company.com',
    })
    await createSlotsForWeek(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'evenWeek',
      },
      { as: adminToken }
    )

    // when
    const response = await createSlotsForWeek(
      {
        day: { year: 2019, month: 1, day: 6 },
        templateName: 'oddWeek',
      },
      { as: adminToken }
    )

    // then
    expect(response.status).toBe(200)
    expect(response.body.partial).toBe(true)

    const slots = await models.Slot.findAll()
    expect(slots).toHaveLength(118)
  })
})
