Template.Notification.events({
    "click .accept_trainer": function () {
        var tt = AthletesDB.findOne({username: Meteor.user().username})._id;
        AthletesDB.update(tt, {$set: {trainer: this.value}});
        NotificationsDB.insert({username: this.value, read: false, athletetype: true, value: Meteor.user().username});
        Materialize.toast("Votre entraineur est maintenant " + this.value + ".", 1000);
        NotificationsDB.update(this._id, {$set: {read: true}});
    },
    "click .accept_athlete": function () {
        var tt = AthletesDB.findOne({username: this.value})._id;
        AthletesDB.update(tt, {$set: {trainer: Meteor.user().username}});
        NotificationsDB.insert({username: this.value, read: false, trainertype: true, value: Meteor.user().username});
        Materialize.toast("L'athlete " + this.value + " vous a ajouté.", 1000);
        NotificationsDB.update(this._id, {$set: {read: true}});
    },
    "click .decline_invite": function () {
        NotificationsDB.update(this._id, {$set: {read: true}});
    }
});