Meteor.methods({
  updateWorkout(argument) {
    check(argument, Object);

    try {
      return WorkoutsDB.update(argument._id, {
        $set: {'key': argument.key}
      });
    } catch (exception) {
      return exception;
    }
  },
  setCR(id, cr) {
    check(id, String);
    check(cr, Object);
    return WorkoutsDB.update(id, {$set: { cr: cr}});
  }
});
