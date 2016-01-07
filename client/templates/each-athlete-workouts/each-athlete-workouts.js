Template.AthleteWorkouts.helpers({
    workouts: function () {
        return Meteor.user().profile === "trainer" ? WorkoutsDB.find({user: Session.get('selectedAthlete')}) : WorkoutsDB.find();
    },
    isWks: function () {
        return ReactiveMethod.call("getAllWk",this.username).length == 0;
    }
});
