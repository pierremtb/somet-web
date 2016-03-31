Template.Dashboard.helpers({
  trainerIs() {
    if (Meteor.user().profile === "trainer")
      return true;
    else
      return false;
  },
  username() {
    return Meteor.user().profile.trainer ? Session.get("selectedAthlete") : Meteor.user().username;
  },
  trainerIsMe() {
    if (this.trainer == Meteor.user())
      return true;
    else
      return false;
  },
  selectedAthlete() {
    return Session.get("selectedAthlete");
  }
});

Template.Dashboard.events({
  "click .add_athlete_button": function () {
    NotificationsDB.insert({
      username: this.username,
      read: false,
      trainerconfirmationtype: true,
      value: Meteor.user().username
    });
    Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
  },
  "click .add_trainer_button": function () {
    NotificationsDB.insert({
      username: this.username,
      read: false,
      athleteconfirmationtype: true,
      value: Meteor.user().username
    });
    Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
  }
});
