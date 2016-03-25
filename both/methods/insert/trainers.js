Meteor.methods({
  insertTrainer( argument ) {
    check( argument, Object );

    try {
      var documentId = TrainersDB.insert( argument );
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
