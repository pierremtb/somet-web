Meteor.methods({
  removePlan( argument ) {
    check( argument, String );

    try {
      PlansDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
