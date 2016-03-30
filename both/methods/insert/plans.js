Meteor.methods({
  insertPlan( argument ) {
    check( argument, Object );
    try {
      var documentId = PlansDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
