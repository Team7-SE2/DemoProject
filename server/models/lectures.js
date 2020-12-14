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
        Lecture.belongsTo(models.subjects, { as: 'subject', onDelete: 'CASCADE'});
        Lecture.belongsTo(models.rooms, { as: 'room', onDelete: 'CASCADE' });
        Lecture.belongsToMany(models.users, { as: 'lecture_bookings', through: 'bookings', onDelete: 'CASCADE' });
        Lecture.belongsToMany(models.users, { as: 'lecture_bookings_queues', through: 'lectureQueues', onDelete: 'CASCADE' });
    }
    return Lecture;
}

  