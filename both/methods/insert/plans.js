Meteor.methods({
  insertPlan(doc) {
    check(doc, Object);

    if (PlansDB.findOne({monday_date: doc.monday_date})) {
      throw new Meteor.Error("Un plan existe déjà pour la semaine ciblée");
    }

    PlansDB.insert(doc, (e) => {
      if (e) throw e;
    });
  }
});
