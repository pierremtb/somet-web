Template.Notification.events({
  "click #mark_read": function () {
    Meteor.call("declineNotification", this._id);
  },
  "click #accept": function(e,t) {
    Meteor.call(this.type == "invite_for_athlete" ? "acceptTrainer" : "acceptAthlete", this.value, Meteor.user().username, this._id, function(e,r) {
      Materialize.toast(r,1000);
    });
  }
});

Template.Notification.helpers({
  actionNotif() {
    return this.type == "invite_for_athlete" || this.type == "invite_for_trainer";
  }
});
