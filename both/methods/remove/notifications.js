Meteor.methods({
  removeNotification(id) {
    check(id, String);

    NotificationsDB.remove(id, (e) => {
      if (e) throw e;
    });
  }
});
