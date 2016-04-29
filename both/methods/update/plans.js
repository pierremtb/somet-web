Meteor.methods({
  updatePlan(id, doc) {
    check(doc, Object);
    check(id, String);

    PlansDB.update(id, {
      $set: doc
    }, (e) => {
      if (e) throw e;
    });
  }
});
