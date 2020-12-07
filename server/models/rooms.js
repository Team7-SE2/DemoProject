"use strict";
module.exports = function (sequelize, DataTypes) {
    var Room = sequelize.define('rooms', {
        id: { type: DataTypes.STRING, primaryKey: true },
        description: { type: DataTypes.STRING },
        capacity: { type: DataTypes.INTEGER} // room capacity
    }, {
        paranoid: true
    });

    Room.associate = function (models) {
        Room.hasMany(models.lectures, {as: 'lectures'});
    }
    return Room;
}

  