Template.AthleteWorkouts.helpers({
    workouts: function () {
          return WorkoutsDB.find({user: this.username + ""}, {sort: {date: -1}});
    }
});