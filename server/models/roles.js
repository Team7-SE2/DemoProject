"use strict";
module.exports = function (sequelize, DataTypes) {
    var Role = sequelize.define('roles', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },//1->Administrator; 2->Support Officer; 3->Booking Manager; 4->Teacher; 5->Student
        role: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        system_role: { type: DataTypes.BOOLEAN, default: false }
    }, {
        paranoid: true
    });

    Role.associate = function (models) {
        Role.hasMany(models.users, { as: 'users' });
    }
    return Role;
}

  