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
