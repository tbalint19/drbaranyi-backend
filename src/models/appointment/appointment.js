module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    type: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isIn: [['general', 'vaccine']],
      },
    },
    note: DataTypes.STRING,
  })

  Appointment.associate = (models) => {
    models.Appointment.belongsTo(models.Slot)
    models.Appointment.belongsTo(models.User)
  }

  return Appointment
}
