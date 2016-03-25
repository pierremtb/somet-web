Meteor.methods({
  getNotifications( argument ) {
    check( argument, Object );

    var document = NotificationsDB.find( argument ).fetch();

    if ( !document ) {
      throw new Meteor.Error( 'document-not-found', 'No documents found matching this query.' );
    }

    return document;
  }
});
