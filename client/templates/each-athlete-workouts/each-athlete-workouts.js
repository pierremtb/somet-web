Template.AthleteWorkouts.helpers({
    workouts: function () {
        return ReactiveMethod.call("getAllWk",this.username);
    },
    isWks: function () {
        return ReactiveMethod.call("getAllWk",this.username).length == 0;
    }
});
