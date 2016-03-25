Meteor.methods({
  removeWorkout( argument ) {
    check( argument, String );

    try {
      WorkoutsDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
