Meteor.methods({
  updateWorkout( argument ) {
    check( argument, Object );

    try {
      var documentId = WorkoutsDB.update( argument._id, {
        $set: { 'key': argument.key }
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
