Template.TrainersSearchResult.events({
    "click #add_trainer_button": function () {
        Meteor.call("sendTrainerInvite",this.username, Meteor.user().username, function(e,r) {
            Materialize.toast(r,1000);
        });
    }
});