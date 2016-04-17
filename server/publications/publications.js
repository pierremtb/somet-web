Meteor.publish('workoutOfThisId', function (id) {
  check(id, String);
  let owner = WorkoutsDB.findOne({_id: id}) ? WorkoutsDB.findOne({_id: id}).owner : false;
  let usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
    var wk = WorkoutsDB.find({_id: id});
    return wk ? wk : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('eventOfThisId', function (id) {
  check(id, String);
  let owner = EventsDB.findOne({_id: id}) ? EventsDB.findOne({_id: id}).owner : false,
      usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
    var ev = EventsDB.find({_id: id});
    return ev ? ev : this.ready();
  } else {
    return {};
  }
});

Meteor.publish('planOfThisId', function (id) {
  check(id, String);
  let owner = PlansDB.findOne({_id: id}) ? PlansDB.findOne({_id: id}).owner : false,
    usr = Meteor.users.findOne(this.userId);
  if (owner == usr.username|| usr.profile.my_athletes.indexOf(owner) != -1) {
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

Meteor.publish('eventsOfCurrentUser', function () {
  var evts = EventsDB.find({username: Meteor.users.findOne(this.userId).username});
  return evts ? evts : this.ready();
});

Meteor.publish('plansOfCurrentUser', function () {
  var wks = PlansDB.find({username: Meteor.users.findOne(this.userId).username});
  return wks ? wks : this.ready();
});

Meteor.publish('planOfThisUserForThisWeek', function (m) {
  var pl = PlansDB.find({username: Meteor.users.findOne(this.userId).username, monday_date: m});
  return pl ? pl : this.ready();
});

Meteor.publish('allUsers', function () {
  var a = Meteor.users.find();
  return a ? a : this.ready();
});

Meteor.publish('allUsersSync', function () {
  return Meteor.users.find();
});

Meteor.publish("getUserData", function () {
  return Meteor.users.find({_id: this.userId});
});

Meteor.publish('notificationsOfCurrentUser', function () {
  var n = NotificationsDB.find({owner: Meteor.users.findOne(this.userId).username});
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

Meteor.publish('mainUserDataSync', function () {
  let usr = Meteor.users.findOne({_id: this.userId});
  if(usr.profile.trainer) {
    return [
      Meteor.users.find({$or: [{_id: this.userId}, {username: {$in: usr.profile.my_athletes} } ] }),
      WorkoutsDB.find({owner: {$in: usr.profile.my_athletes}}, {fields: {fit_values: false}}),
      PlansDB.find({owner: {$in: usr.profile.my_athletes}}),
      EventsDB.find({owner: {$in: usr.profile.my_athletes}}),
      NotificationsDB.find({owner: usr.username})
    ];
  } else {
    return [
      Meteor.users.find({_id: this.userId}),
      WorkoutsDB.find({owner: usr.username}, {fields: {fit_values: false}}),
      PlansDB.find({owner: usr.username}),
      EventsDB.find({owner: usr.username}),
      NotificationsDB.find({owner: usr.username})
    ];
  }
});

Meteor.publish('workoutOfThisIdSync', function (id) {
  return WorkoutsDB.findOne(id);
});
