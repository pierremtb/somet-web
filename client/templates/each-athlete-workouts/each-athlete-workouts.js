Template.AthleteWorkouts.helpers({
    workouts: function () {
      Meteor.call("getAllWk", this.username + "", function(e,r) {
          wks.set(r);
      });
      return wks.get();
    }
});

Template.AthleteWorkouts.created = function() {
    wks = new ReactiveVar();
}
