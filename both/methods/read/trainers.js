Meteor.methods({
  getTrainers( argument ) {
    check( argument, String );

    var document = TrainersDB.find( argument );

    if ( !document ) {
      throw new Meteor.Error( 'document-not-found', 'No documents found matching this query.' );
    }

    return document;
  }
});
