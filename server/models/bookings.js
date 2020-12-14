"use strict";
module.exports = function (sequelize, DataTypes) {
    var Booking = sequelize.define('bookings', {
        user_id: {  type: DataTypes.STRING  },
        lecture_id: {  type: DataTypes.STRING  },
        waiting: {type: DataTypes.BOOLEAN},
    
    });

    Booking.associate = function (models) {
        Booking.belongsTo(models.users, { as: 'user', onDelete: 'CASCADE' });
        Booking.belongsTo(models.lectures, { as: 'lecture', onDelete: 'CASCADE' });
    }
    return Booking;
}

  