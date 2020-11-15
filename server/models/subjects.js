"use strict";
module.exports = function (sequelize, DataTypes) {
    var Subject = sequelize.define('subjects', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },//1->Administrator; 2->Support Officer; 3->Booking Manager; 4->Teacher; 5->Student
        subjectID: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
    }, {
        paranoid: true
    });

    Subject.associate = function (models) {
        Subject.belongsTo(models.users, { as: 'teacher' });
        Subject.belongsToMany(models.users, { through: 'teaching_loads' });
        Subject.hasMany(models.lectures, {as: 'lectures'});
    }
    return Subject;
}

  