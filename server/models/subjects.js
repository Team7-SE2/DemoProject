"use strict";
module.exports = function (sequelize, DataTypes) {
    var Subject = sequelize.define('subjects', {
        id: { type: DataTypes.STRING, primaryKey: true },
        year: { type: DataTypes.INTEGER },
        semester: { type: DataTypes.INTEGER },
        subjectID: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
    }, {
        paranoid: true
    });

    Subject.associate = function (models) {
        Subject.belongsTo(models.users, { as: 'teacher', onDelete: 'CASCADE' });
        Subject.belongsToMany(models.users, { through: 'teaching_loads', onDelete: 'CASCADE' });
        Subject.hasMany(models.lectures, {as: 'lectures', onDelete: 'CASCADE'});
    }
    return Subject;
}

  