Meteor.methods({
  updatePlan( id, argument ) {
    check( argument, Object );
    check( id, String );

    try {
      var documentId = PlansDB.update( id, {
        $set: argument
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
