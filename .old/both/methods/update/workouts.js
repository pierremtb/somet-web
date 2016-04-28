Meteor.methods({
  updateWorkout(id, doc) {
    check(doc, Object);
    check(id, String);

    WorkoutsDB.update(id, {
      $set: doc
    }, (e) => {
      if (e) throw e;
    });
  },
  setCR(id, cr) {
    check(id, String);
    check(cr, Object);

    WorkoutsDB.update(id, {$set: { cr: cr}}, (e) => {
      if (e) throw e;
    });
  }
});
