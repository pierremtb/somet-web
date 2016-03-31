Template.MyTrainer.helpers({
    trainer() { return TrainersDB.findOne({username: AthletesDB.findOne({username: Meteor.user().username}).trainer}).username; },
    otherTrainers() { return TrainersDB.find({username: {$ne: AthletesDB.findOne({username: Meteor.user().username}).trainer}}); },
  });

Template.MyTrainer.events({
    "click .add_trainer_button": function () {
        Meteor.call("sendTrainerInvite",this.username, Meteor.user().username, function(e,r) {
            Materialize.toast(r,1000);
        });
    },
    "click .rmv_trainer_button": function () {
        Meteor.call("removeTrainer",this.trainer,Meteor.user().username,function(e,r) {
            Materialize.toast(r,1000);
        });
    }
});
