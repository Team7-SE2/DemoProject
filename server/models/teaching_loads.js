"use strict";
module.exports = function (sequelize, DataTypes) {
    var TeachingLoads = sequelize.define('teaching_loads', {
    });

    TeachingLoads.associate = function (models) {
        TeachingLoads.belongsTo(models.users, { as: 'user', onDelete: 'CASCADE' });
        TeachingLoads.belongsTo(models.subjects, { as: 'subject', onDelete: 'CASCADE' });
    }
    return TeachingLoads;
}