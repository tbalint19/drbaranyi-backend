module.exports = (sequelize, DataTypes) => {
  const Slot = sequelize.define('Slot', {
    timestamp: { type: DataTypes.BIGINT, unique: true },

    year: DataTypes.INTEGER,
    month: DataTypes.INTEGER,
    day: DataTypes.INTEGER,
    hour: DataTypes.INTEGER,
    minute: DataTypes.INTEGER,

    zone: DataTypes.STRING,

    offset: DataTypes.INTEGER,
  })

  Slot.associate = (models) => {
    models.Slot.hasOne(models.Appointment)
  }

  return Slot
}
