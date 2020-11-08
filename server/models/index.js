var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var config = require("../config/sequelize.json");

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    storage: config.storage,
    paranoid: true,
    pool: {
        max: config.max,
        min: 0,
        idle: config.idleTimeoutMillis
    },
    define: { underscored: true },
    logging: false
});

var db = {};

// sequelize.query("UPDATE users SET y = 42 WHERE x = 12")
// .then(()=>{

// })

// var db = require("../models/index.js");
// db['users'].findAll({where:{name:'Giosuè'},include:{model:'roles'}})
// .then((users)=>{

// })
// .catch((err)=>{
//     console.log(err)
// })

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

sequelize.sync(/*{alter:true}*/).then(async function(){
    /*await db['roles'].findOrCreate({where:{id:1},defaults:{role:'Administrator',system_role:true}})
    await db['roles'].findOrCreate({where:{id:2},defaults:{role:'Support Officer',system_role:true}})
    await db['roles'].findOrCreate({where:{id:3},defaults:{role:'Booking Manager',system_role:true}})
    await db['roles'].findOrCreate({where:{id:4},defaults:{role:'Teacher'}})
    await db['roles'].findOrCreate({where:{id:5},defaults:{role:'Student'}})
    await db['users'].findOrCreate({where:{userID: 's202020'},defaults:{userID:'s202020',name:'Team7',surname:'Se2',email:'s202020@studenti.polito.it',role_id:1}})
    await db['users'].findOrCreate({where:{userID: 's202021'},defaults:{userID:'s202021',name:'Giosuè',surname:'Valfrè',email:'s202021@studenti.polito.it',role_id:5}})
    await db['users'].findOrCreate({where:{userID: 's202022'},defaults:{userID:'s202022',name:'Gaetano',surname:'Buscema',email:'s202022@studenti.polito.it',role_id:5}})*/
    await db['users'].findOrCreate({where:{userID: 't202021'},defaults:{userID:'t202021',name:'Antonio',surname:'Vetrò',email:'t202021@professori.polito.it',role_id:4}})
    await db['users'].findOrCreate({where:{userID: 't202022'},defaults:{userID:'t202022',name:'Marco',surname:'Torchiano',email:'t202022@professori.polito.it',role_id:4}})
    await db['users'].findOrCreate({where:{userID: 'so202021'},defaults:{userID:'so202021',name:'SupportOfficer1',surname:'SO',email:'so202021@professori.polito.it',role_id:2}})
    await db['users'].findOrCreate({where:{userID: 'bm202021'},defaults:{userID:'bm202021',name:'BookingManager1',surname:'BM',email:'bm202021@professori.polito.it',role_id:3}})
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;