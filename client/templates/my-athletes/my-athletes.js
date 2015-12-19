Template.MyAthletes.helpers({
    athletes: function () {
      return AthletesDB.find({trainer: Meteor.user().username});
    },
    otherathletes: function () {
      return AthletesDB.find({trainer : {$ne : Meteor.user().username }});
    },
    trainerIs: function(){ 
        if(Meteor.user().profile === "trainer") 
            return true; 
        else 
            return false;
    }
  });

Template.MyAthletes.events({
    "click .add_athlete_button": function () {
        if(NotificationsDB.findOne({username: this.username, read: false, trainerconfirmationtype:true, value: Meteor.user().username}) === undefined) {
        NotificationsDB.insert({username: this.username, read: false, trainerconfirmationtype:true, value: Meteor.user().username});
        Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
        }
        else
            Materialize.toast("Cette invitation a déjà été envoyée", 1000);
    },
    "click .rmv_athlete_button": function () {
        NotificationsDB.insert({username: this.username, read: false, trainerremovedtype:true, value: Meteor.user().username});
        var tt = AthletesDB.findOne({username: this.username})._id;
        AthletesDB.update(tt, {$set: {trainer: ""}});
        Materialize.toast("L'athlète " + this.username + " ne fait plus partie de votre liste.", 1000);
    },
    "click .add_trainer_button": function () {
        NotificationsDB.insert({username: this.username, read: false, athleteconfirmationtype:true, value: Meteor.user().username});
        Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
    }
});