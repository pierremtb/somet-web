Meteor.methods({
  updateEvent(id, doc) {
    check(doc, Object);
    check(id, String);

    EventsDB.update(id, {$set: doc}, (e) => {
        if (e) throw e;
    });
  }
});
