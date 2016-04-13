var date = new Date();
var graphs_are_not_here = true;
var month = date.getMonth() + 1, year = date.getFullYear();
var months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Décembre"];
var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getPreviousMonday() {
  var prev_m = new Date();
  prev_m.setDate(prev_m.getDate() - date.getDay() + 1);
  return prev_m.getDate() + " " + monthNames[prev_m.getMonth()] + ", " + prev_m.getFullYear();
}

Template.UserDash.helpers({
  usernameMake(cn) {
    return cn.toLowerCase().replace(/ /g, "_");
  },
  isWk() {
    return WorkoutsDB.findOne();
  },
  lastWk() {
    return WorkoutsDB.findOne({}, {sort: {start_date: -1}});
  },
  todayPl() {
    let pl = PlansDB.findOne();
    pl.days[new Date().getDay() - 1]._id = pl._id;
    return (pl.monday_date.getDate() + " " + monthNames[pl.monday_date.getMonth()] + ", " + pl.monday_date.getFullYear() == getPreviousMonday()) ? pl.days[new Date().getDay() - 1] : false;
  },
  user() {
    return this.username + "";
  }
});

Template.UserDash.events({
  "click #finish_strava_conf": function (e, t) {
    let strava_sync = t.find("#strava_sync").checked,
      token = Meteor.user().services.strava.accessToken,
      complete_name = Meteor.user().profile.fullName,
      username = t.find("#new_username").value,
      password = t.find("#new_password").value;
    Meteor.call("updateThisUser", Meteor.user()._id, {
      username: username,
      'profile.complete_name': complete_name,
      'profile.strava_sync': strava_sync,
      'profile.finished_set_up': true
    });
    Meteor.call("setThisUserPassword", Meteor.userId(), password, {logout: false});
    Meteor.call("setThisUserEmail", Meteor.userId(), Meteor.user().profile.email);
    if (t.find("#athlete_radio").checked) {
      Meteor.call("insertAthlete", {username: username, complete_name: complete_name});
    } else {
      Meteor.call("insertTrainer", {username: username, complete_name: complete_name});
    }
  }
});

Template.UserDash.onCreated(function () {
  let self = this;
  self.subscribe("getUserData");
  Tracker.autorun(function () {
    self.subscribe("workoutsOfUsr", Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username);
    self.subscribe("thisWeekPlansOfUsr", Meteor.user().profile.trainer ? Session.get('selectedAthlete') : Meteor.user().username);
  });
});
