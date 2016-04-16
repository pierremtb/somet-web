Template.Nav.events({
  'click #logout_button': function () {
    Meteor.logout(function (e) {
      FlowRouter.redirect('/');
    });
  },
  'click #mobile_logout': function () {
    Meteor.logout(function (e) {
      FlowRouter.go('/');
    });
  },
  'click .athleteD': function () {
    Session.set("selectedAthlete", this.username);
    Session.set("selectedAthleteName", this.complete_name);
  },
  "click .clear_notifs": function () {
    Meteor.call("makeAllNotificationsRead", Meteor.user().username);
  },
  "keyup #search_bar": function (e, t) {
    Session.set("searchQuery", e.target.value);
  }
});

Template.Nav.helpers({
  notificationsNotRead() {
    return NotificationsDB.findOne({read: false}) ? NotificationsDB.find({read: false}) : false;
  },
  selectedAthlete() {
    return Session.get("selectedAthlete");
  },
  selectedAthleteName() {
    return Session.get("selectedAthleteName");
  },
  athletes() {
    return AthletesDB.find({trainer: Meteor.user().username});
  },
  page() {
    return FlowRouter.getRouteName();
  },
  usersWhoMatch() {
    return UsersIndex.search(Session.get("searchQuery")).fetch();
  }
});

Template.Nav.onRendered(function () {
  if(Meteor.user().profile.trainer)
    Session.set("selectedAthlete", AthletesDB.findOne({}, {limit: 1}).username);
});

Template.Nav.onCreated(function () {
  this.subscribe('allUsers');
  this.subscribe('notificationsOfCurrentUser');
  this.subscribe('getUserData');
});
