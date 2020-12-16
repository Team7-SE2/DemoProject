var fs = require('fs');
var csv = require('csv-parser');
var db = require('../models/index');
var moment = require ('moment');

const Op = db.Sequelize.Op;
var csvParser = {};
csvParser.parse = function (type){
    var results = [];
    var headers = [];
    switch(type){
        case 'Students':{headers = ['id','name','surname','city','email','birthday','SSN'];} break;
        case 'Professors':{headers = ['id','name','surname','email','SSN'];} break;
        case 'Courses':{headers = ['id','year','semester','description','teacher_id'];} break;
        case 'Enrollment':{headers = ['subject_id','user_id'];} break;
        case 'Schedule1s':{headers = ['code','room','day','seats','time'];} break;
        //case 'Schedule2s':{headers = ['code','room','day','seats','time'];} break;
        default: {console.log("Ma che minchia hai scritto?")} break;
    }
    fs.createReadStream(process.cwd()+"/csv_files/"+type+".csv")
        .pipe(csv({separator: ',',headers: headers}))
        .on('data', (data) => results.push(data))
        .on('end', () => {
            results.splice(0,1);
            csvParser[type](results);
        })
};

csvParser.Students = function (data){
    data.forEach((s,index)=>{
        data[index].role_id = 5;
       // data[index].password = "$2a$10$mMyE5EzEhdYq6rwpMVd.9.BLr360p6x9aUQ7uF7SpulEd5agm7lja";
    })
    
    /*let ids = []

    data.forEach((user) => {

        ids.push(user.id);

    })
*/
    //console.log(ids)

    db['users'].destroy({
        where : {
            role_id : 5
        },
        //truncate: true,
        cascade: true,
        force: true
    }).then(() => {

        db['users'].bulkCreate(data);

    });

};

csvParser.Professors = function (data){
    data.forEach((s,index)=>{
        data[index].role_id = 4;
        //data[index].password = "$2a$10$mMyE5EzEhdYq6rwpMVd.9.BLr360p6x9aUQ7uF7SpulEd5agm7lja";
    })
    
    /*let ids = []

    data.forEach((user) => {

        ids.push(user.id);

    })*/

    //console.log('TEACHER' + JSON.stringify(ids))
    
    db['users'].destroy({
        where : {
            role_id : 4
        },
        //truncate: true,
        cascade: true,
        force: true
    }).then(() => {

        db['users'].bulkCreate(data);

    });
};
csvParser.Courses = function (data){
    var subjectName = {}
    data.forEach((s,index)=>{
        var suffix = '';
        var fields = s.description.split(" ")
        var subjectID = '';
        fields.forEach((field)=>{
            if(field == 'I')
                field = 1;
            if(field == 'II')
                field = 2;
            if(field == 'III')
                field = 3;
            subjectID += field.slice?field.slice(0,1).toUpperCase():field;
        })
        if(!subjectName[s.description])
            subjectName[s.description]=0
        subjectName[s.description]++;
        if(subjectName[s.description]!=0)
            suffix = '_'+subjectName[s.description];
        data[index].subjectID = subjectID + suffix;
    })

    /*let ids = []

    data.forEach((user) => {

        ids.push(user.id);

    })

    console.log(ids)*/

    db['subjects'].destroy({
        /*where : {
            id : {
                [Op.in] : ids
            }
        },*/
        truncate: true,
        cascade: true,
        force: true
    }).then(() => {

        db['subjects'].bulkCreate(data);

    });
    //db['subjects'].bulkCreate(data);
};
csvParser.Enrollment = function(data){
    
    db['teaching_loads'].destroy({
        truncate: true,
        cascade: true,
        force: true
    })/*db['teaching_loads'].destroy({
        where : {
            id : {
                [Op.in] : ids
            }
        },
        force: true
    })*/.then(() => {

        db['teaching_loads'].bulkCreate(data);

    });

    //db['teaching_loads'].bulkCreate(data);
};
csvParser.Schedule1s = function(data){
    /*id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        date: { type: DataTypes.DATE },
        duration: { type: DataTypes.REAL },
        remote: {type: DataTypes.BOOLEAN}*/
    var roomsObj = {};
    var rooms = [];
    var lectures = [];
    var days = {
        'Mon': [],
        'Tue': [],
        'Wed': [],
        'Thu': [],
        'Fri': [],
        'Sat': [],
        'Sun': []
    }
    var firstDay = moment().year()+'-09-28'; //
    var lastDay = moment().add(1,'year').year()+'-01-16'; //
    firstDay = moment(firstDay,'YYYY-MM-DD');
    lastDay = moment(lastDay,'YYYY-MM-DD');
    for(var i = 0; i< 7; i++){
        //firstDay.format('ddd')
        var firstDayClone = firstDay.clone();
        firstDay.add(1,"days");
        days[firstDayClone.format('ddd')].push(firstDayClone.clone());
        while (firstDayClone.add(7,"days").isSameOrBefore (lastDay)) {
            days[firstDayClone.format('ddd')].push(firstDayClone.clone());
        }
    }
    data.forEach((s,index)=>{
        roomsObj[s.room] = {id:s.room,capacity:s.seats}
        var startHours = s.time.split("-")[0];
        var endHours = s.time.split("-")[1];
        var duration = moment(endHours,'HH:mm').diff(moment(startHours,'HH:mm'),'hours',true);
        days[s.day].forEach(function(dates){
            lectures.push({
                date: moment(dates).hours(startHours.split(":")[0]).minutes(startHours.split(":")[1]),
                subject_id: s.code,
                duration: duration,
                room: s.room
        })
        })
    })

    Object.keys(roomsObj).forEach((k)=>{
        rooms.push(roomsObj[k]);
    })

    db['rooms'].destroy({
        truncate: true,
        force: true,
        cascade: true
    })

    db['lectures'].destroy({
        truncate: true,
        force: true,
        cascade: true
    })
    
    db['rooms'].bulkCreate(rooms)
        .then((booo)=>{
            //console.log(lectures);
            db['lectures'].bulkCreate(lectures)
        })
};
// csvParser.Schedule2s = function(data){

// };

module.exports = csvParser;