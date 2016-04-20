Meteor.methods({
  insertEvent(doc) {
    check(doc, Object);

    if (EventsDB.findOne({date: doc.date})) {
      throw new Meteor.Error("Existe déjà à cette date");
    }

    EventsDB.insert(doc, (e) => {
      if (e) throw e;
    });
  }
});
