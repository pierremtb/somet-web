Meteor.methods({
  insertPlan( argument ) {
    check( argument, Object );
    console.log(argument);
    try {
      var documentId = PlansDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
