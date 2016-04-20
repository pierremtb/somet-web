Meteor.methods({
  setThisNotificationRead(id) {
    check(id, String);

    NotificationsDB.update(id, {
      $set: { 'read': true }
    }, (e) => {
      if (e) throw e;
    });
  }
});
