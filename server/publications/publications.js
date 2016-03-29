Meteor.publish('workoutOfThisId', function (id) {
  check(id, String);
  var wk = WorkoutsDB.find({_id: id});
  return wk ? wk : this.ready();
});

Meteor.publish('eventOfThisId', function (id) {
  check(id, String);
  var ev = EventsDB.find({_id: id});
  return ev ? ev : this.ready();
});

Meteor.publish('planOfThisId', function (id) {
  check(id, String);
  var pl = PlansDB.find({_id: id});
  return pl ? pl : this.ready();
});

Meteor.publish('workoutsOfCurrentUser', function () {
  var wks = WorkoutsDB.find({user: Meteor.users.findOne(this.userId).username});
  return wks ? wks : this.ready();
});

Meteor.publish('workoutsOfUsr', function (usr) {
  check(usr, String);
  var wks = WorkoutsDB.find({owner: usr}, {sort: {start_date: -1}});
  return wks ? wks : this.ready();
});

Meteor.publish('plansOfUsr', function (usr) {
  check(usr, String);
  var pls = PlansDB.find({owner: usr});
  return pls ? pls : this.ready();
});

Meteor.publish('lastWorkoutOfUsr', function (usr) {
  check(usr, String);
  var wks = WorkoutsDB.find({owner: usr, limit: 1});
  return wks ? wks : this.ready();
});

Meteor.publish('lastPlanOfUsr', function (usr) {
  check(usr, String);
  var pls = PlansDB.find({owner: usr, limit: 1});
  return pls ? pls : this.ready();
});

Meteor.publish('eventsOfUsr', function (usr) {
  check(usr, String);
  var evts = EventsDB.find({owner: usr});
  return evts ? evts : this.ready();
});

Meteor.publish('dayEventsOfUsr', function (usr, date) {
  check(usr, String);
  check(date, Date);
  var evts = EventsDB.find({owner: usr, date: date});
  return evts ? evts : this.ready();
});

Meteor.publish('workoutsOfMyAthletes', function () {
  var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
  for (var i in aths)
    names.push(aths[i].username);
  var wks = WorkoutsDB.find({user: {$in: names}});
  return wks ? wks : this.ready();
});

Meteor.publish('eventsOfMyAthletes', function () {
  var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
  for (var i in aths)
    names.push(aths[i].username);
  var evts = EventsDB.find({username: {$in: names}});
  return evts ? evts : this.ready();
});

Meteor.publish('eventsOfCurrentUser', function () {
  var evts = EventsDB.find({username: Meteor.users.findOne(this.userId).username});
  return evts ? evts : this.ready();
});

Meteor.publish('plansOfCurrentUser', function () {
  var wks = PlansDB.find({username: Meteor.users.findOne(this.userId).username});
  return wks ? wks : this.ready();
});

Meteor.publish('plansOfMyAthletes', function () {
  var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
  for (var i in aths)
    names.push(aths[i].username);
  var pls = PlansDB.find({username: {$in: names}});
  return pls ? pls : this.ready();
});

Meteor.publish('planOfThisUserForThisWeek', function (m) {
  var pl = PlansDB.find({username: Meteor.users.findOne(this.userId).username, monday_date: m});
  return pl ? pl : this.ready();
});

Meteor.publish('plansOfMyAthletesForThisWeek', function (m) {
  var aths = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username}).fetch(), names = [];
  for (var i in aths)
    names.push(aths[i].username);
  var pl = PlansDB.find({username: {$in: names}, monday_date: m});
  return pl ? pl : this.ready();
});

Meteor.publish('athletesOfCurrentUser', function () {
  var a = AthletesDB.find({trainer: Meteor.users.findOne(this.userId).username});
  return a ? a : this.ready();
});

Meteor.publish('allAthletes', function () {
  var a = AthletesDB.find();
  return a ? a : this.ready();
});

Meteor.publish('allTrainers', function () {
  var a = TrainersDB.find();
  return a ? a : this.ready();
});

Meteor.publish("getUserData", function () {
  return Meteor.users.find({_id: this.userId});
});

Meteor.publish('notificationsOfCurrentUser', function () {
  var n = NotificationsDB.find({owner: Meteor.users.findOne(this.userId).username});
  return n ? n : this.ready();
});

Meteor.publish('meAsAthlete', function () {
  var n = AthletesDB.find({username: Meteor.users.findOne(this.userId).username});
  return n ? n : this.ready();
});

Meteor.publish('meAsTrainer', function () {
  var n = TrainersDB.find({username: Meteor.users.findOne(this.userId).username});
  return n ? n : this.ready();
});
