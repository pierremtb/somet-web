Template.AthleteWorkouts.helpers({
  workouts: function () {
    return WorkoutsDB.find();
  },
  isWks: function () {
    return WorkoutsDB.find().count() > 0;
  }
});

Template.AthleteWorkouts.onCreated(function () {
  this.subscribe('workoutsOfUsr', this.data.username);
});
