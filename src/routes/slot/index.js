const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const validate = require('../../middleware/validator')
const authorize = require('../../middleware/authorization')
const {
  is,
  can,
  isAuthenticated,
} = require('../../middleware/authorization/chain')
const { createSlotsForDay, createSlotsForWeek } = require('./middleware')

router.post('/day', [
  authorize(is('ADMIN')),
  validate(
    body('day').exists(),
    body('day.year')
      .isInt()
      .custom((int) => 1970 < int),
    body('day.month')
      .isInt()
      .custom((int) => 0 < int && int < 13),
    body('day.day')
      .isInt()
      .custom((int) => 0 < int && int < 32),
    body('templateName').isIn(['oddWeek', 'evenWeek']),
    body('dayIndex')
      .isInt()
      .custom((int) => 0 <= int && int < 7)
  ),
  createSlotsForDay(),
])

router.post('/week', [
  authorize(is('ADMIN')),
  validate(
    body('day').exists(),
    body('day.year')
      .isInt()
      .custom((int) => 1970 < int),
    body('day.month')
      .isInt()
      .custom((int) => 0 < int && int < 13),
    body('day.day')
      .isInt()
      .custom((int) => 0 < int && int < 32),
    body('templateName').isIn(['oddWeek', 'evenWeek'])
  ),
  createSlotsForWeek(),
])

module.exports = router
