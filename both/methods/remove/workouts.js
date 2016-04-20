Meteor.methods({
  removeWorkout(id) {
    check(id, String);

    WorkoutsDB.remove(id, (e) => {
      if (e) throw e;
    });
  }
});
