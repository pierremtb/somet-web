Meteor.methods({
  updateTrainer( argument ) {
    check( argument, Object );

    try {
      var documentId = Collection.update( argument._id, {
        $set: { 'key': argument.key }
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  },
  changeTrainerName( usr, cn ) {
    check( cn, String );
    check( usr, String );

    try {
      var documentId = TrainersDB.update(TrainersDB.findOne({username: usr})._id, {$set: {complete_name: cn}});
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
