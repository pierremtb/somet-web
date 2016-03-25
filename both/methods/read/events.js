Meteor.methods({
  getEvents( argument ) {
    check( argument, String );

    var document = EventsDB.find( argument );

    if ( !document ) {
      throw new Meteor.Error( 'document-not-found', 'No documents found matching this query.' );
    }

    return document;
  }
});
