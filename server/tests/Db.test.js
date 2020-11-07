test('check if the sequelize.json file exists and it was configured ', () => {

    // if the file doesn't exists it throws an exception and the test will fail
    var sequelize = require('../config/sequelize.json')

    expect(sequelize).not.toBeNull();

    expect(sequelize.dialect).not.toBeNull();
    expect(sequelize.database).not.toBeNull();
    expect(sequelize.username).not.toBeNull();
    expect(sequelize.password).not.toBeNull();
    expect(sequelize.host).not.toBeNull();

    if(sequelize.dialect == 'sqlite')
        expect(sequelize.storage).not.toBeNull();
});