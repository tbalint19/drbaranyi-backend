const models = require('../../models')
const { generateForDay, generateForWeek } = require('../../utils/generateDates')
const dateTemplates = require('../../../static/dateTemplates.json')

const createSlotsForDay = (opts) => async (req, res, next) => {
  const { day, templateName, dayIndex } = req.body
  const slots = generateForDay(day, dateTemplates[templateName], dayIndex)

  try {
    await Promise.all(slots.map((slot) => models.Slot.create(slot)))
  } catch (e) {
    return res.json({ partial: true })
  }

  res.json({ partial: false })
}

const createSlotsForWeek = (opts) => async (req, res, next) => {
  const { day, templateName } = req.body
  const slots = generateForWeek(day, dateTemplates[templateName])

  try {
    await Promise.all(slots.map((slot) => models.Slot.create(slot)))
  } catch (e) {
    return res.json({ partial: true })
  }

  res.json({ partial: false })
}

module.exports = { createSlotsForDay, createSlotsForWeek }
