Template.Dashboard.helpers({
  username() {
    return Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username;
  },
  selectedAthlete() {
    return Session.get("selectedAthlete");
  }
});

Template.Dashboard.events({});
