var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

Template.Settings.helpers({
    isTrainer: function () { return Meteor.user().profile === "trainer";},
    athletes: function () { return AthletesDB.find({trainer: Meteor.user().username}); },
    myName: function () { return Meteor.user().profile === "trainer" ? TrainersDB.findOne({username: Meteor.user().username}).complete_name : AthletesDB.findOne({username: Meteor.user().username}).complete_name;},
    trainer: function () { return TrainersDB.findOne({username: AthletesDB.findOne({username: Meteor.user().username}).trainer}).username; },
    trainersWhoMatch: function () { return TrainersDBIndex.search(Session.get("trainerQuery")).fetch();},
    athletesWhoMatch: function () { return AthletesDBIndex.search(Session.get("athleteQuery")).fetch();}
});

Template.Settings.events({
    "keyup #trainer_search": function(e,t) {
        Session.set("trainerQuery", t.find("#trainer_search").value);
    },
    "keyup #athlete_search": function(e,t) {
        Session.set("athleteQuery", t.find("#athlete_search").value);
    },
    "click #n_name_submit": function (e,t) {
        Meteor.call("changeCompleteName", Meteor.user().username, t.find("#new_complete_name").value, Meteor.user().profile === "trainer");
    }
});

Template.Settings.onRendered(function() {
    $('.modal-trigger').leanModal();
});
