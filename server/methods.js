Meteor.methods({
    getNotificationsNotRead: function (usr) {
        return NotificationsDB.find({username: usr, read: false}).fetch();
    },
    getTrainerOfAthlete: function (usr) {
        return AthletesDB.findOne({"trainer": usr}).username;
    },
    getAthletesOfTrainer: function (usr) {
        return AthletesDB.find({trainer: usr}).fetch();
    },
    makeAllNotificationsRead: function (usr) {
        var tt = NotificationsDB.find({username: usr}).fetch();
        var tt_l = tt.length;
        var i;
        for (i = 0; i < tt_l; i++)
            NotificationsDB.update(tt[i]._id, {$set: {read: true}});
    },
    getLastWk: function (usr) {
        var r = WorkoutsDB.find({user: usr}, {sort: {date: -1}, limit: 1}).fetch();
        return r.length == 0 ? null : r;
    },
    getThisWeekPlan: function (usr, m) {
        return PlansDB.findOne({username: usr, monday_date: m});
    },
    countThisSupportHoursInMonth: function (usr, month, year, sup) {
        return WorkoutsDB.find({user: usr, month: month, year: year, support: sup}).fetch().length;
    },
    countSupportsHoursInMonth: function (usr, month, year) {
        return {
            mtbs: WorkoutsDB.find({user: usr, month: month, year: year, support: "mtb"}).fetch().length,
            roads: WorkoutsDB.find({user: usr, month: month, year: year, support: "road"}).fetch().length,
            hts: WorkoutsDB.find({user: usr, month: month, year: year, support: "ht"}).fetch().length,
            runs: WorkoutsDB.find({user: usr, month: month, year: year, support: "run"}).fetch().length,
            swims: WorkoutsDB.find({user: usr, month: month, year: year, support: "swim"}).fetch().length,
            endrs: WorkoutsDB.find({user: usr, month: month, year: year, support: "endr"}).fetch().length,
            skixs: WorkoutsDB.find({user: usr, month: month, year: year, support: "skix"}).fetch().length,
            othrs: WorkoutsDB.find({user: usr, month: month, year: year, support: "othr"}).fetch().length
        }
    },
    getMonthWk: function (usr, month, year) {
        return WorkoutsDB.find({user: usr, month: month, year: year}).fetch();
    },
    getAllWk: function (usr) {
        return WorkoutsDB.find({user: usr}, {sort: {date: -1}}).fetch();
    },
    getAllPl: function (usr) {
        return PlansDB.find({username: usr}, {sort: {date: -1}}).fetch();
    },
    getThisWk: function (id) {
        return WorkoutsDB.findOne({"_id": id});
    },
    getThisPl: function (id) {
        return PlansDB.findOne({"_id": id});
    },
    addThisWk: function (wk) {
        WorkoutsDB.insert(wk);
        return 0;
    },
    addThisPl: function (pl) {
        PlansDB.insert(pl);
        return 0;
    },
    sendPush: function(f,t,tit, txt) {
        console.log(f);
        console.log(t);
        Push.send({
            from: f,
            title: tit,
            text: txt,
            badge: 1,
            query: {
                userId: Meteor.users.findOne({username: t})._id
            }
        });
    },
    sendTestPush: function() {
        Push.send({
            from: 'Test',
            title: 'Hello',
            text: 'World',
            badge: 12,
            query: {}
        });
    },
    rmThisWk: function (id) {
        WorkoutsDB.remove(id);
        return 0;
    },
    rmThisPl: function (id) {
        PlansDB.remove(id);
        return 0;
    },
    getHisTrainer: function (usr) {
        return AthletesDB.findOne({username: usr}).trainer;
    },
    getOtherTrainers: function (usr) {
        var tt = AthletesDB.findOne({username: usr}).trainer;
        return TrainersDB.find({username: {$ne: tt}}).fetch();
    },
    getOtherAthletes: function (usr) {
        return AthletesDB.find({trainer: {$ne: usr}}).fetch();
    },
    removeAthlete: function (usr, me) {
        NotificationsDB.insert({username: usr, read: false, trainerremovedtype: true, value: me});
        var tt = AthletesDB.findOne({username: usr})._id;
        AthletesDB.update(tt, {$set: {trainer: ""}});
        return usr;
    },
    sendAthleteInvite: function (usr, me) {
        if (NotificationsDB.findOne({
                username: usr,
                read: false,
                trainerconfirmationtype: true,
                value: me
            }) === undefined) {
            NotificationsDB.insert({username: usr, read: false, trainerconfirmationtype: true, value: me});
            return "Une invitation a été envoyée à " + usr + ".";
        }
        else
            return "Cette invitation a déjà été envoyée.";
    },
    sendTrainerInvite: function (usr, me) {
        if (NotificationsDB.findOne({
                username: usr,
                read: false,
                athleteconfirmationtype: true,
                value: me
            }) === undefined) {
            NotificationsDB.insert({username: usr, read: false, athleteconfirmationtype: true, value: me});
            return "Une invitation a été envoyée à " + usr + ".";
        }
        else
            return "Cette invitation a déjà été envoyée.";
    },
    acceptTrainer: function (tr, me, id) {
        var tt = AthletesDB.findOne({username: me})._id;
        AthletesDB.update(tt, {$set: {trainer: tr}});
        NotificationsDB.insert({username: tr, read: false, athletetype: true, value: me});
        NotificationsDB.update(id, {$set: {read: true}});
        return "L'entraineur " + tr + " vous a été ajouté";
    },
    acceptAthlete: function (a, me, id) {
        var tt = AthletesDB.findOne({username: a})._id;
        AthletesDB.update(tt, {$set: {trainer: me}});
        NotificationsDB.insert({username: a, read: false, trainertype: true, value: me});
        NotificationsDB.update(id, {$set: {read: true}});
        return "L'athlete " + a + " vous a ajouté.";
    },
    declineNotification: function (id) {
        NotificationsDB.update(id, {$set: {read: true}});
    },
    removeTrainer: function (tr, me) {
        NotificationsDB.insert({username: tr, read: false, athleteremovedtype: true, value: me});
        var tt = AthletesDB.findOne({username: me})._id;
        AthletesDB.update(tt, {$set: {trainer: ""}});
        return tr + " n'est plus votre entraineur.";
    },
    addToTrainersDB: function (usr) {
        TrainersDB.insert({username: usr});
        return "done";
    },
    addToAthletesDB: function (usr) {
        AthletesDB.insert({username: usr});
        return "done";
    },
    convertToTcx: function (path) {
        var fs = Meteor.npmRequire('fs');
        var exec = Npm.require('child_process').exec;
        exec("/usr/bin/cat \"../../../../../.uploads" + path + "\" |  /usr/bin/java -jar  \"../../../../../external/FitToJson.jar\" > ../../../../../.uploads/output.json");
        return "done";
    },
    parseTcx: function (path) {
        var fs = Meteor.npmRequire('fs');
        var txt = fs.readFileSync('../../../../../.uploads/output.json', 'utf8');
        var data = JSON.parse(txt);
        var info = data.sessions[0];
        var rec = data.records;
        var start_date = new Date(rec[0].timestamp.replace(' CET', ''));
        console.log(start_date);
        var time_values = [], distance_values = [], elevation_values = [], speed_values = [], cadence_values = [], hr_values = [], power_values = [];
        for(i in rec) {
            time_values.push((Date.parse(rec[i].timestamp.replace(' CET', '')) - start_date)/1000);
            distance_values.push(parseInt(rec[i].distance));
            elevation_values.push(rec[i].altitude);
            speed_values.push(rec[i].speed*3.6);
            cadence_values.push(rec[i].cadence);
            hr_values.push(rec[i].hr);
            power_values.push(rec[i].power);
        }
        return {
            date: start_date,
            distance: info.totalDistance,
            duration: parseInt(info.totalElapsedTime),
            calories: info.totalCalories,
            ascent: info.totalAscent,
            sport: info.sport,
            avg_cadence: info.avgCadence,
            avg_speed: info.avgSpeed * 3.6,
            max_speed: info.maxSpeed * 3.6,
            max_cadence: info.maxCadence,
            descent: info.totalDescent,
            time_values: time_values,
            distance_values: distance_values,
            elevation_values: elevation_values,
            hr_values: hr_values,
            power_values: power_values,
            cadence_values: cadence_values,
            speed_values: speed_values
        };
    }
});