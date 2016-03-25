Meteor.methods({
  removeAthlete( argument ) {
    check( argument, String );

    try {
      AthletesDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
