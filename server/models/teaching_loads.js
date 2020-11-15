"use strict";
module.exports = function (sequelize, DataTypes) {
    var TeachingLoads = sequelize.define('teaching_loads', {
    });

    TeachingLoads.associate = function (models) {
        TeachingLoads.belongsTo(models.users, { as: 'user' });
        TeachingLoads.belongsTo(models.subjects, { as: 'subject' });
    }
    return TeachingLoads;
}