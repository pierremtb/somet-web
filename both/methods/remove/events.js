Meteor.methods({
  removeEvent(id) {
    check(id, String);

    EventsDB.remove(id, (e) => {
      if (e) throw e;
    });
  }
});
