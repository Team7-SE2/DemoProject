"use strict";
module.exports = function (sequelize, DataTypes) {
    var Lecture = sequelize.define('lectures', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        date: { type: DataTypes.DATE },
        duration: { type: DataTypes.REAL },
        remote: {type: DataTypes.BOOLEAN}
    }, {
        paranoid: process.env.NODE_ENV =="test"? false : true
    });

    Lecture.associate = function (models) {
        Lecture.belongsTo(models.subjects, { as: 'subject' });
        Lecture.belongsTo(models.rooms, { as: 'room' });
        Lecture.belongsToMany(models.users, { as: 'lecture_bookings', through: 'bookings' });
        Lecture.belongsToMany(models.users, { as: 'lecture_bookings_queues', through: 'lectureQueues' });
    }
    return Lecture;
}

  