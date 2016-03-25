Template.Notification.events({
    "click .accept_trainer": function () {
        Meteor.call("acceptTrainer",this.value, Meteor.user().username, this._id, function(e,r) {
            Materialize.toast(r, 1000);
        });
    },
    "click .accept_athlete": function () {
        Meteor.call("acceptAthlete", this.value, Meteor.user().username, this._id, function(e,r) {
            Materialize.toast(r,1000);
        });
    },
    "click .decline_invite": function () {
        Meteor.call("declineNotification", this._id);
    }
});

Template.Notification.helpers({
  trainerConfirmation() {
    return this.type == "trainer_confirmation";
  },
  athleteConfirmation() {
    return this.type == "athlete_confirmation";
  },
  inviteForAthlete() {
    return this.type == "invite_for_athlete";
  },
  inviteForTrainer() {
    return this.type == "invite_for_trainer";
  }
});
