Meteor.methods({
  updateEvent( argument ) {
    check( argument, Object );

    try {
      var documentId = EventsDB.update( argument._id, {
        $set: { 'key': argument.key }
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
