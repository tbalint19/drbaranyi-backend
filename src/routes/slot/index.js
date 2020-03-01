const models = require('../../models')
const express = require('express')
const router = express.Router()
const { generateForDay, generateForWeek } = require('../../utils/generateDates')
const dateTemplates = require('../../../static/dateTemplates.json')

router.post('/day', async (req, res) => {
//  authorize(req.user.is('ADMIN'))

  const { day, templateName, dayIndex } = req.body
  const slots = generateForDay(day, dateTemplates[templateName], dayIndex)

  try {
    await Promise.all(slots.map((slot) => models.Slot.create(slot)))
  } catch (e) {
    return res.json({ partial: true })
  }

  res.json({ partial: false })
})

router.post('/week', async (req, res) => {
//  authorize(req.user.is('ADMIN'))

  const { day, templateName } = req.body
  const slots = generateForWeek(day, dateTemplates[templateName])

  try {
    await Promise.all(slots.map((slot) => models.Slot.create(slot)))
  } catch (e) {
    return res.json({ partial: true })
  }

  res.json({ partial: false })
})

module.exports = router
