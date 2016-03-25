Meteor.methods({
  removeTrainer( argument ) {
    check( argument, String );

    try {
      TrainersDB.remove( argument );
    } catch( exception ) {
      return exception;
    }
  }
});
