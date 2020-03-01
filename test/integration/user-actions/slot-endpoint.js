const app = require('../../../src/app.js')
const request = require('supertest')

const createSlotsForDay = async ({ day, templateName, dayIndex }, { as }) => {
  const response = await request(app)
    .post('/api/slot/day')
    .set('Authorization', as)
    .send({ day, templateName, dayIndex })
  return response
}

const createSlotsForWeek = async ({ day, templateName }, { as }) => {
  const response = await request(app)
    .post('/api/slot/week')
    .set('Authorization', as)
    .send({ day, templateName })
  return response
}

module.exports = {
  createSlotsForDay,
  createSlotsForWeek,
}
