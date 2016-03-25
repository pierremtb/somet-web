Meteor.methods({
  insertEvent( argument ) {
    check( argument, Object );

    try {
      var documentId = EventsDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
