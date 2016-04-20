Template.Nav.events({
  'click #logout_button': () => {
    Meteor.logout(function (e) {
      FlowRouter.go('/settings');
      FlowRouter.redirect('/login');
    });
  },
  'click #mobile_logout': () => {
    Meteor.logout(function (e) {
      FlowRouter.go('/');
    });
  },
  'click .athleteD': function() {
    Session.set("selectedAthlete", this.username);
    Session.set("selectedAthleteName", this.complete_name);
  },
  "click .clear_notifs": () => {
    Meteor.call("makeAllNotificationsRead", Meteor.user().username);
  },
  "keyup #search_bar": (e, t) =>{
    Session.set("searchQuery", e.target.value);
  },
  'click #action_search a': (e,t) => {
    FlowRouter.go('/search');
  }
});

Template.Nav.helpers({
  ifMyProfileSetActive: () => isMyProfile.get() ? 'active' : '',
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
    return Meteor.users.find({"profile.my_trainer": Meteor.user().username});
  },
  page() {
    return FlowRouter.getRouteName();
  }
});

Template.Nav.onRendered(function () {
  if(Meteor.user().profile.trainer)
    Session.set("selectedAthlete", Meteor.user().profile.my_athletes[0]);
  Tracker.autorun(() => {
    FlowRouter.watchPathChange();
    isMyProfile.set(FlowRouter.current().path.indexOf(Meteor.userId()) != -1 && FlowRouter.getRouteName() == "Profil");
  });
});

Template.Nav.onCreated(function () {
  this.subscribe('allUsers');
  this.subscribe('notificationsOfCurrentUser');
  this.subscribe('getUserData');

  isMyProfile = new ReactiveVar(false);
});
