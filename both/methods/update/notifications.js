Meteor.methods({
  setRead( argument ) {
    check( argument, Object );

    try {
      var documentId = NotificationsDB.update( argument._id, {
        $set: { 'key': argument.key }
      });
      return documentId;
    } catch( exception ) {
      return exception;
    }
  }
});
