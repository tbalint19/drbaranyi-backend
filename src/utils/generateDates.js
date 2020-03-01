const { DateTime } = require('luxon')

const toSlot = (luxonDate) => ({
  timestamp: luxonDate.ts,

  year: luxonDate.c.year,
  month: luxonDate.c.month,
  day: luxonDate.c.day,
  hour: luxonDate.c.hour,
  minute: luxonDate.c.minute,

  zone: luxonDate._zone.zoneName,

  offset: luxonDate.o,
})

const generateForDay = (day, template, dayIndex) =>
  Array.from(
    {
      length: Math.floor(
        (60 / template.defaults.splitLength) * template.days[dayIndex].hours
      ),
    },
    (_, slotIndex) =>
      DateTime.fromObject(
        Object.assign(day, template.days[dayIndex].time, {
          zone: template.defaults.zone,
        })
      ).plus({ minutes: template.defaults.splitLength * slotIndex })
  ).map(toSlot)

const generateForWeek = (monday, template) =>
  template.days
    .flatMap((dayTemplate, dayIndex) =>
      Array.from(
        {
          length: Math.floor(
            (60 / template.defaults.splitLength) * dayTemplate.hours
          ),
        },
        (_, slotIndex) =>
          DateTime.fromObject(
            Object.assign(monday, dayTemplate.time, {
              zone: template.defaults.zone,
            })
          )
            .plus({ days: dayIndex })
            .plus({ minutes: template.defaults.splitLength * slotIndex })
      )
    )
    .map(toSlot)

module.exports = {
  generateForDay,
  generateForWeek,
}
