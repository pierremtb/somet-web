Meteor.methods({
  removeNotification( argument ) {
    check( argument, String );

    try {
      NotificationsDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
