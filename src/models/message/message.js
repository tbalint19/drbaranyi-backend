module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    text: DataTypes.STRING,
  })

  Message.associate = (models) => {
    models.Message.belongsTo(models.Channel)
  }

  return Message
}
