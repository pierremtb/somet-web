Meteor.methods({
  removeEvent( argument ) {
    check( argument, String );

    try {
      EventsDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
