Template.MyAthletes.helpers({
    athletes() { return Meteor.user().profile.my_athletes; },
    otherAthletes() { return Meteor.users.find({"profile.my_trainer": {$ne: Meteor.user().username}}); }
  });

Template.MyAthletes.events({
    "click .add_athlete_button": function () {
        Meteor.call("sendAthleteInvite",this.username,Meteor.user().username, function(e,r) {
            Materialize.toast(r);
        });
    },
    "click .rmv_athlete_button": function (e,t) {
        Meteor.call("removeAthlete",this.username + "", Meteor.user().username,function(e,r) {
            Materialize.toast("L'athlète " + r + " ne fait plus partie de votre liste.", 1000);
        });
    }
});
