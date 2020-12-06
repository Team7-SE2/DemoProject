module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('users', {
        id: { type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true },
        userID: { type: DataTypes.STRING },
        name: { type: DataTypes.STRING },
        surname: { type: DataTypes.STRING },
        salt: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
    }, {
        paranoid: process.env.NODE_ENV =="test"? false : true
    });

    User.associate = function (models) {
        User.belongsTo(models.roles, { as: "role" });
        User.belongsToMany(models.subjects, { through: "teaching_loads" });
        User.belongsToMany(models.lectures, { through: 'bookings' });
        User.belongsToMany(models.lectures, { through: 'lectureQueues' });
    }

    // function hashPassword(password, salt) {
    //     var hash = crypto.createHash('sha256');
    //     hash.update(password);
    //     hash.update(salt);
    //     return hash.digest('hex');
    // }
    //User.hashPassword = hashPassword;

    return User;
}