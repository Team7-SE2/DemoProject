"use strict";
module.exports = function (sequelize, DataTypes) {
    var Booking = sequelize.define('bookings', {
    });

    Booking.associate = function (models) {
        Booking.belongsTo(models.users, { as: 'user' });
        Booking.belongsTo(models.lectures, { as: 'lecture' });
    }
    return Booking;
}

  