Template.MyAthletes.helpers({
    athletes: function () { return AthletesDB.find({trainer: Meteor.user().username}); },
    otherAthletes: function () { return AthletesDB.find({trainer: {$ne: Meteor.user().username}}); },
    isTrainer: function(){ return Meteor.user().profile === "trainer";}
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
