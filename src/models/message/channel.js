module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {})

  Channel.associate = (models) => {
    models.Channel.hasMany(models.Message)
    models.Channel.belongsTo(models.User)
  }

  return Channel
}
