Template.MyTrainer.helpers({
    trainer: function () {
      return AthletesDB.findOne({username: Meteor.user().username}).trainer;
    },
    othertrainers: function () {
      var tt = AthletesDB.findOne({username: Meteor.user().username}).trainer;
      return TrainersDB.find({username: {$ne: tt }});
    },
    trainerIs: function(){
        if(Meteor.user().profile === "trainer")
            return true;
        else
            return false;
    }
  });

Template.MyTrainer.events({
    "click .add_trainer_button": function () {
        if(NotificationsDB.findOne({username: this.username, read: false, athleteconfirmationtype:true, value: Meteor.user().username}) === undefined) {
        NotificationsDB.insert({username: this.username, read: false, athleteconfirmationtype:true, value: Meteor.user().username});
        Materialize.toast("Une invitation a été envoyée à " + this.username + ".", 1000);
        }
        else
            Materialize.toast("Cette invitation a déjà été envoyée", 1000);
    },
    "click .rmv_trainer_button": function () {
        NotificationsDB.insert({username: this.trainer, read: false, athleteremovedtype:true, value: Meteor.user().username});
        var tt = AthletesDB.findOne({username: Meteor.user().username})._id;
        AthletesDB.update(tt, {$set: {trainer: ""}});
        Materialize.toast(this.trainer + " n'est plus votre entraineur.", 1000);
    }
});
