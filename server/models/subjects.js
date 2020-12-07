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
        Subject.belongsTo(models.users, { as: 'teacher' });
        Subject.belongsToMany(models.users, { through: 'teaching_loads' });
        Subject.hasMany(models.lectures, {as: 'lectures'});
    }
    return Subject;
}

  