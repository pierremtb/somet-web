Template.AthletePlans.helpers({
    plans: function () {
        return Meteor.user().profile === "trainer" ? PlansDB.find({username: Session.get('selectedAthlete')}) : PlansDB.find();
    },
    isNoPls: function () {
        return PlansDB.find().fetch().length == 0;
    }
});
