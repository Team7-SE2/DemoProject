"use strict";
module.exports = function (sequelize, DataTypes) {
    var LectureQueue = sequelize.define('lectureQueues', {
    });

    LectureQueue.associate = function (models) {
        LectureQueue.belongsTo(models.users, { as: 'user' });
        LectureQueue.belongsTo(models.lectures, { as: 'lecture' });
    }
    return LectureQueue;
}

  