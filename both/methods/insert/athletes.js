Meteor.methods({
  insertAthlete( argument ) {
    check( argument, Object );

    try {
      var documentId = AthletesDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
