Meteor.publish('workoutOfThisId', function (id) {
  check(id, String);
  let owner = WorkoutsDB.findOne({_id: id}) ? WorkoutsDB.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne({_id: this.userId}) ? Meteor.users.findOne({_id: this.userId}).username : false;
  if (usr == false || owner == false) return this.ready();
  let is_my_athlete = false,
    my_athletes = AthletesDB.find({trainer: usr}).fetch();
  for (let i in my_athletes)
    if (my_athletes[i].username == owner)
      is_my_athlete = true;
  if (owner == usr || is_my_athlete) {
    var wk = WorkoutsDB.find({_id: id});
    return wk ? wk : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('eventOfThisId', function (id) {
  check(id, String);
  let owner = EventsDB.findOne({_id: id}) ? EventsDB.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne({_id: this.userId}) ? Meteor.users.findOne({_id: this.userId}).username : false;
  if (usr == false || owner == false) return this.ready();
  let is_my_athlete = false,
    my_athletes = AthletesDB.find({trainer: usr}).fetch();
  for (let i in my_athletes)
    if (my_athletes[i].username == owner)
      is_my_athlete = true;
  if (owner == usr || is_my_athlete) {
    var ev = EventsDB.find({_id: id});
    return ev ? ev : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('planOfThisId', function (id) {
  check(id, String);
  let owner = PlansDB.findOne({_id: id}) ? PlansDB.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne({_id: this.userId}) ? Meteor.users.findOne({_id: this.userId}).username : false;
  if (usr == false || owner == false) return this.ready();
  let is_my_athlete = false,
    my_athletes = AthletesDB.find({trainer: usr}).fetch();
  for (let i in my_athletes)
    if (my_athletes[i].username == owner)
      is_my_athlete = true;
  if (owner == usr || is_my_athlete) {
    var pl = PlansDB.find({_id: id});
    return pl ? pl : this.ready();
  } else {
    return {};
  }
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
  let date = new Date();
  var wks = WorkoutsDB.find({owner: usr, limit: 1});
  return wks ? wks : this.ready();
});

Meteor.publish('lastWorkoutOfUsrSync', function (usr) {
  check(usr, String);
  return WorkoutsDB.find({owner: usr}, {sort: {start_date: -1}, limit: 1});
});


Meteor.publish('thisWeekPlansOfUsr', function (usr) {
  check(usr, String);
  var pl = PlansDB.find({owner: usr}, {sort: {monday_date: -1}, limit: 1});
  return pl ? pl : this.ready();
});


Meteor.publish('thisWeekPlanOfUsrSync', function (usr) {
  check(usr, String);
  return PlansDB.find({owner: usr}, {sort: {monday_date: -1}, limit: 1});
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

Meteor.publish('thisTargetWorkoutsOfUsr', function (target, usr) {
  check(target, Object);
  check(usr, String);

  let start, end;

  if (target.year != -1 && target.month != -1) {
    start = new Date(target.year, target.month, 1);
    end = new Date(target.year, target.month + 1, 0);
  } else if (target.year != -1 && target.month == -1) {
    start = new Date(target.year, 0, 1);
    end = new Date(target.year + 1, 0, 0);
  } else {
    start = new Date(0);
    end = new Date(9999, 12, 31);
  }

  var wks = WorkoutsDB.find({
    owner: usr,
    start_date: {$gt: start, $lt: end}
  }, {sort: {start_date: 1}});

  return wks ? wks : this.ready();
});
