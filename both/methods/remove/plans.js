Meteor.methods({
  removePlan(id) {
    check(id, String);

    PlansDB.remove(id, (e) => {
      if (e) throw e;
    });
  }
});
