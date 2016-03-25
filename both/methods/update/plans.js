Meteor.methods({
  updatePlan( argument ) {
    check( argument, Object );

    try {
      var documentId = PlansDB.update( argument._id, {
        $set: { 'key': argument.key }
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
