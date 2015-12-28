Template.MyTrainer.helpers({
    trainer: function () { return ReactiveMethod.call("getHisTrainer", Meteor.user().username); },
    othertrainers: function () { return ReactiveMethod.call("getOtherTrainers", Meteor.user().username); }
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
