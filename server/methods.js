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
        exec("/usr/bin/python ../../../../../python/fittotcx.py \"../../../../../.uploads" + path + "\" > ../../../../../.uploads/sample.tcx");
        return "done";
    },
    parseTcx: function (path) {
        var opts = {};
        opts.elapsed = true;
        var fs = Meteor.npmRequire('fs');
        var tcx = Meteor.npmRequire('tcx-js');
        var parser = new tcx.Parser(opts);
        parser.parse_file("../../../../../.uploads/sample.tcx");
        var activity = parser.activity;
        var creator = activity.creator;
        var author = activity.author;
        var trackpoints = activity.trackpoints;
        var length = trackpoints.length;
        console.log(trackpoints[123]);
        function getValues(s) {
            var r = "";
            for (var i = 0; i < length - 1; i++) {
                r += Math.round(parseInt(trackpoints[i][s])) + ",";
            }
            r += trackpoints[length - 1][s];
            return r;
        }

        var data = {
            distance: Math.round(parseInt(trackpoints[trackpoints.length - 1].dist_meters) / 1000),
            duration: Math.round((trackpoints[trackpoints.length - 1].elapsed_sec - trackpoints[0].elapsed_sec) / 60),
            time_values: getValues("elapsed_sec"),
            distance_values: getValues("dist_meters"),
            elevation_values: getValues("alt_meters"),
            hr_values: getValues("hr"),
            power_values: getValues("bike_power"),
            cadence_values: getValues("bike_cadence"),
            speed_values: getValues('speed')
        }
        return data;
    }
});