Meteor.publish('workoutOfThisId', function(id) {
    var wk = WorkoutsDB.find({_id: id});
    return wk ? wk : this.ready();
});

Meteor.publish('workoutsOfCurrentUser', function() {
    var wks = WorkoutsDB.find({user: Meteor.users.findOne(this.userId).username});
    return wks ? wks : this.ready();
});

Meteor.publish('workoutsOfMyAthletes', function() {
    var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
    for(var i in aths)
        names.push(aths[i].username);
    var wks = WorkoutsDB.find({user: {$in: names} });
    return wks ? wks : this.ready();
});

Meteor.publish('plansOfCurrentUser', function() {
    var wks = PlansDB.find({username: Meteor.users.findOne(this.userId).username});
    return wks ? wks : this.ready();
});

Meteor.publish('plansOfMyAthletes', function() {
    var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
    for(var i in aths)
        names.push(aths[i].username);
    var pls = PlansDB.find({username: {$in: names} });
    return pls ? pls : this.ready();
});

Meteor.publish('planOfThisUserForThisWeek', function(m) {
    var pl = PlansDB.find({username: Meteor.users.findOne(this.userId).username, monday_date: m});
    return pl ? pl : this.ready();
});

Meteor.publish('plansOfMyAthletesForThisWeek', function(m) {
    var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
    for(var i in aths)
        names.push(aths[i].username);
    var pl = PlansDB.find({username: {$in: names}, monday_date: m});
    return pl ? pl : this.ready();
});

Meteor.publish('athletesOfCurrentUser', function() {
    var a = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username});
    return a ? a : this.ready();
});

Meteor.publish('allAthletes', function() {
    var a = AthletesDB.find();
    return a ? a : this.ready();
});

Meteor.publish('allTrainers', function() {
    var a = TrainersDB.find();
    return a ? a : this.ready();
});

Meteor.publish('notificationsOfCurrentUser', function() {
    var n = NotificationsDB.find({username: Meteor.users.findOne(this.userId).username});
    return n ? n : this.ready();
});