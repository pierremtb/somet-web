Meteor.methods({
  updateEvent( id, argument ) {
    check( argument, Object );
    check( id, String );

    try {
      var documentId = EventsDB.update( id, {
        $set: argument
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
