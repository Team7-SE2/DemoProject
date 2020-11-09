"use strict";
module.exports = function (sequelize, DataTypes) {
    var Lecture = sequelize.define('lectures', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },//1->Administrator; 2->Support Officer; 3->Booking Manager; 4->Teacher; 5->Student
        date: { type: DataTypes.DATE },
        duration: { type: DataTypes.REAL },
    }, {
        paranoid: process.env.NODE_ENV =="test"? false : true
    });

    Lecture.associate = function (models) {
        Lecture.belongsTo(models.subjects, { as: 'subject' });
        Lecture.belongsToMany(models.users, { through: 'bookings' });
    }
    return Lecture;
}

  